class PlacesController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: { places: current_user.places }, status: :ok }
      format.html {}
    end
  end

  def create
    place = current_user.places.new(place_params)

    if place.save
      render json: place, status: :created
    else
      render json: place.errors, status: :unprocessable_entity
    end
  end

  private

  def place_params
    params.require(:place).permit(:name)
  end
end
