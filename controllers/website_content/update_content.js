const {
  validateWebsiteContent,
  WebsiteContent,
} = require("../../models/website_content");

const { RENDER_BAD_REQUEST } = require("../common/utils");

const update_website_content = async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateWebsiteContent(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    // Extract object key and value from the request body
    const object_key = Object.keys(req.body.website_content)[0];
    const object_value = req.body.website_content[object_key];

    let existing_content = await WebsiteContent.findOne({});
    if (existing_content) {
      // Ensure deep merging of nested objects
      existing_content.website_content = {
        ...existing_content.website_content,
        [object_key]: {
          ...existing_content.website_content[object_key],
          ...object_value,
        },
      };

      await existing_content.save();
    } else {
      const object_content = {
        website_content: { [object_key]: object_value },
      };
      let websiteContent = new WebsiteContent(object_content);
      existing_content = await websiteContent.save();
    }

    res.status(200).json({
      code: 200,
      message: "Content updated successfully",
      webpage_content: existing_content,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = update_website_content;
