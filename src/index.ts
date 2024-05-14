import dotenv from 'dotenv';
import { GoogleAdsApi, enums } from 'google-ads-api';

dotenv.config();

// https://developers.google.com/oauthplayground/

const start = async () => {
  const { CLIENT_ID, CLIENT_SECRET, DEVELOPER_TOKEN, REFRESH_TOKEN } =
    process.env;

  const client = new GoogleAdsApi({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    developer_token: DEVELOPER_TOKEN,
  });

  const customers = await client.listAccessibleCustomers(REFRESH_TOKEN);
  console.log(`start LOG:  customers:`, customers);
  // console.log(`start LOG:  customers:`, customers);

  const customer = client.Customer({
    customer_id: '5566962688', // Gerente Account (MCC)
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
  console.log(`start LOG:  campaigns:`, campaigns);
};

start().catch(console.error);
