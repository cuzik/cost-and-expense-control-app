class EntriesController < ApplicationController
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
    entry = current_user.wallets.find(entry_params[:wallet_id]).entries.new(entry_params)

    if entry.save
      render json: entry, status: :created
    else
      render json: entry.errors, status: :unprocessable_entity
    end
  end

  private
    def entry_params
      params.require(:entry).permit(:description, :due_date, :value, :kind, :wallet_id)
    end
end
