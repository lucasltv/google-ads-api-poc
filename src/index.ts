import dotenv from 'dotenv';
import { GoogleAdsApi, enums } from 'google-ads-api';

dotenv.config();

// https://developers.google.com/oauthplayground/

const start = async () => {
  const {
    CLIENT_ID,
    CLIENT_SECRET,
    DEVELOPER_TOKEN,
    REFRESH_TOKEN,
    GOOGLE_ADS_ACCOUNT,
  } = process.env;

  const client = new GoogleAdsApi({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    developer_token: DEVELOPER_TOKEN,
  });

  // const customers = await client.listAccessibleCustomers(REFRESH_TOKEN);
  // console.log(`start LOG:  customers:`, customers);

  const customer = client.Customer({
    customer_id: GOOGLE_ADS_ACCOUNT, // Gerente Account (MCC)
    refresh_token: REFRESH_TOKEN,
  });

  // TODO: campaigns and metrics:
  // - Impressions
  // - Clicks
  // - Cost
  // - Conversions
  // - ConversionValue
  // - CTR
  // - CPC
  // - CPA
  // - ROAS
  // - ConversionRate

  const campaigns = await customer.report({
    entity: 'campaign',
    attributes: [
      'campaign.id',
      'campaign.name',
      'campaign.bidding_strategy_type',
      'campaign_budget.amount_micros',
    ],
    metrics: [
      'metrics.cost_micros',
      'metrics.clicks',
      'metrics.impressions',
      'metrics.all_conversions',
    ],
    constraints: {
      'campaign.status': enums.CampaignStatus.ENABLED,
    },
    limit: 20,
  });
  debugger;
  console.log(`start LOG:  campaigns:`, campaigns);
};

start().catch(e => {
  debugger;
  console.error(e);
});
