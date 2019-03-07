class UserMailer < ApplicationMailer
    default from: "Nico Glennon <nico@percent.me>"
    default "Message-ID" => ->(v){"<#{Digest::SHA2.hexdigest(Time.now.to_i.to_s)}@percent.me>"}

    def welcome_email(user)
        @user = user
        @url  = 'https://percent.me/login'
        mail(to: @user.email, subject: '✨ Welcome to Percent! ✨')
    end

    def goodbye_email(user)
        @user = user
        mail(to: @user.email, subject: 'Thanks for trying out Percent! 😸')
    end
end
