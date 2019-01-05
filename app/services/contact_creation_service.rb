require 'gibbon'

class ContactCreationService
    def initialize
        if ENV['MAILCHIMP_API_KEY']
            @mailchimp = Gibbon::Request.new(api_key: ENV['MAILCHIMP_API_KEY'], symbolize_keys: true)
            @mailchimp.timeout = 30
            @mailchimp.open_timeout = 30
        end
    end

    def call(user)
        begin
            list(user).upsert(
            body: {
                email_address: user.email,
                status: 'subscribed',
                merge_fields: {
                UNAME:  user.username,
                }
            }
            )
        rescue Gibbon::MailChimpError => e
            puts "Houston, we have a problem: #{e.status_code} | #{e.message} - #{e.raw_body}"
        end
    end

    private

    def list(user)
        @listid = ENV['MAILCHIMP_LISTID'] ? ENV['MAILCHIMP_LISTID'] : ENV['TEST_MAILCHIMP_LISTID']
        @mailchimp.lists(@listid).members(user.lower_case_md5_hashed_email)
    end
end