import {config} from 'dotenv';
config();

import {GoogleAdsApi} from 'google-ads-api';

const {CLIENT_ID, CLIENT_SECRET, DEVELOPER_TOKEN} = process.env;

const client = new GoogleAdsApi({
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  developer_token: DEVELOPER_TOKEN,
});

const start = async () => {
  debugger;
};

start();
