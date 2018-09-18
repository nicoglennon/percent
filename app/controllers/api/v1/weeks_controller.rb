class Api::V1::WeeksController < ApplicationController
  def show
    @week = Week.find(params[:id])
  end
end
