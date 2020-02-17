ActionMailer::Base.add_delivery_method(
  :ses,
  AWS::SES::Base,
  access_key_id: Rails.application.credentials.aws[:ses_access_key_id],
  secret_access_key: Rails.application.credentials.aws[:ses_secret_access_key],
  server: 'email.us-west-2.amazonaws.com' # エンドポイント
)
