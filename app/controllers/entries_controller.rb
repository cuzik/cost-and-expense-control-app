class EntriesController < ApplicationController
  def index
    entries = current_user.entries.where("due_date >= ? AND due_date <= ?", starts_on, ends_on)

    respond_to do |format|
      format.json {
        render json:
          {
            entries: {
              credit: entries.order(id: :desc).credit,
              debit: entries.order(id: :desc).debit,
              flow: {
                input: entries.credit.map {|entry| entry.value }.reduce(0, :+),
                output: entries.debit.map {|entry| entry.value }.reduce(0, :+)
              }
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

  def starts_on
    return params[:starts_on] if params[:starts_on].present?

    Time.current.beginning_of_month
  end

  def ends_on
    return params[:ends_on] if params[:ends_on].present?

    Time.current.end_of_month
  end

  def entry_params
    params.require(:entry).permit(:description, :due_date, :value, :kind, :wallet_id, :place_id)
  end
end
