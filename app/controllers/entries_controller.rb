class EntriesController < ApplicationController
  before_action :set_entry, only: [:show, :edit, :update, :destroy]

  def index
    respond_to do |format|
      format.json {
        render json:
          {
            entries: {
              credit: current_user.entries.order(id: :desc).credit,
              debit: current_user.entries.order(id: :desc).debit
            }
          },
          status: :ok }
      format.html {}
    end
  end

  def create
    entry = current_user.entries.new(entry_params)

    if entry.save
      render json: entry, status: :created
    else
      render json: entry.errors, status: :unprocessable_entity
    end
  end

  def update
    respond_to do |format|
      if @entry.update(entry_params)
        format.html { redirect_to @entry, notice: 'Entry was successfully updated.' }
        format.json { render :show, status: :ok, location: @entry }
      else
        format.html { render :edit }
        format.json { render json: @entry.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @entry.destroy
    respond_to do |format|
      format.html { redirect_to entries_url, notice: 'Entry was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_entry
      @entry = user.entries.find(params[:id])
    end

    def entry_params
      params.require(:entry).permit(:description, :due_date, :value, :kind)
    end
end
