//require('isomorphic-fetch');
const Shopify = require('shopify-api-node');

const getImageMetafields = async (ctx, accessToken, imgId) => {

	const shopify = new Shopify({
		shopName: ctx.state.webhook.domain,
		accessToken : accessToken
	});

	return await shopify.metafield
		.list({
			metafield: { owner_resource: 'product_image', owner_id: imgId }
		});
};

module.exports = getImageMetafields;