class Api::V1::PasswordResetsController < ApplicationController
  # In Rails 5 and above, this will raise an error if
  # before_action :require_login
  # is not declared in your ApplicationController.

  # request password reset.
  # you get here when the user entered his email in the reset password form and submitted it.

  def new
      @act = params[:act] || 'reset'
      @email = params[:email] || ''
  end

  def create
    @user = User.find_by_email(params[:email])

    # This line sends an email to the user with instructions on how to reset their password (a url with a random token)
    @user.deliver_reset_password_instructions! if @user

    # Tell the user instructions have been sent whether or not email was found.
    # This is to not leak information to attackers about which emails exist in the system.

    @message =["A reset link has been emailed to:", "Please check your email and follow the instructions provided."]
    @recovery_email = params[:email]
    render 'new'
  end

  # This is the reset password form.
  def edit
    @token = params[:id]
    @user = User.load_from_reset_password_token(params[:id])

    if @user.blank?
      not_authenticated
      return
    end
  end

  # This action fires when the user has sent the reset password form.
  def update
    @token = params[:id]
    @user = User.load_from_reset_password_token(params[:id])

    if @user.blank?
      not_authenticated
      return
    end

    # the next line makes the password confirmation validation work
    @user.password_confirmation = params[:user][:password_confirmation]
    # the next line clears the temporary token and updates the password
    if @user.change_password!(params[:user][:password])
      @message = "Your password has been reset!"
    end
    render 'edit'
  rescue ActiveRecord::RecordInvalid
    render :action => "edit"
  end
end
