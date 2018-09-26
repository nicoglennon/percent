class Api::V1::WeeksController < ApplicationController
  def index
    @weeks = Week.all
    render :json => @weeks
  end

  def show
    @week = Week.find(params[:id])
    render :json => @week
  end
end
