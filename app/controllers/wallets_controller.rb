class WalletsController < ApplicationController
  def index
    respond_to do |format|
      format.json {
        render json: { wallets: serialize_wallets(Time.current.beginning_of_month, Time.current.end_of_month) }, status: :ok }
      format.html {}
    end
  end

  def create
    wallet = current_user.wallets.new(wallet_params)

    if wallet.save
      render json: wallet, status: :created
    else
      render json: wallet.errors, status: :unprocessable_entity
    end
  end

  private

  def serialize_wallets(starts_on, ends_on)
    current_user.wallets.map{ |wallet| serialize_wallet(starts_on, ends_on, wallet) }
  end

  def serialize_wallet(starts_on, ends_on, wallet)
    entries_on_the_past = wallet.entries.where("due_date < ?", starts_on)
    current_interval_entries = wallet.entries.where("due_date >= ? AND due_date <= ?", starts_on, ends_on)

    credited_value = entries_on_the_past.credit.map{ |entrie| entrie.value }.sum
    debited_value = entries_on_the_past.debit.map{ |entrie| entrie.value }.sum

    {
      id: wallet.id,
      description: wallet.description,
      kind: wallet.kind,
      amount: wallet.amount,
      previous_balance: credited_value - debited_value,
      credited: current_interval_entries.credit.map{ |entrie| entrie.value }.sum,
      debited: current_interval_entries.debit.map{ |entrie| entrie.value }.sum
    }
  end

  def wallet_params
    params.require(:wallet).permit(:description, :kind, :amount)
  end
end
