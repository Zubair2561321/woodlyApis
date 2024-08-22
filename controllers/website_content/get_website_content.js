const { Company } = require("../../models/companies");
const { Property } = require("../../models/properties");
const { PropertyType } = require("../../models/property_types");
const { Service } = require("../../models/services");
const { WebsiteContent } = require("../../models/website_content");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const get_website_content = async (req, res) => {
  try {
    var website_content = await WebsiteContent.findOne({});
    var companies = await Company.find({}).sort({ createdAt: -1 });
    var services = await Service.find({}).sort({ createdAt: -1 });
    var property_types = await PropertyType.find({}).sort({ createdAt: -1 });
    var properties = await Property.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      code: 200,
      message: "Website Content",
      webpage_content: website_content,
      companies: companies,
      services: services,
      property_types: property_types,
      properties: properties,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = get_website_content;
