module Charts
  class ResumeBalanceController < Charts::BaseController
    def index
      day_names = ["Inicial"]
      gross_profit = [credit_start_amount]
      net_profit = [credit_start_amount - debit_start_amount]
      debiteds = [debit_start_amount]
      totals = [credit_start_amount - debit_start_amount]

      entries_gouped_by_month.each do |first_day_of_month, entries_array|
        entries = Entry.where(id: entries_array.map(&:id))

        day_names << first_day_of_month.strftime("%m/%Y")
        gross_profit << entries.credit.select(:value).sum(:value).round(2)
        debiteds << - entries.debit.select(:value).sum(:value).round(2)
        net_profit << (gross_profit.last + debiteds.last).round(2)
        totals << ((entries.credit.select(:value).sum(:value) + credit_start_amount) - (entries.debit.select(:value).sum(:value) + debit_start_amount)).round(2)
      end

      respond_to do |format|
        format.json { render json: {
          day_names: day_names,
          gross_profit: gross_profit,
          net_profit: net_profit,
          debiteds: debiteds,
          totals: totals
        }, status: :ok }
        format.html {}
      end
    end

    private

    def entries_gouped_by_month
      current_user.entries.group_by do |entrie|
        entrie.due_date.beginning_of_month
      end
    end

    def credit_start_amount
      @credit_amount ||= current_user.wallets.where("amount > 0").select(:amount).sum(:amount)
    end

    def debit_start_amount
      @debit_amount = - current_user.wallets.where("amount < 0").select(:amount).sum(:amount)
    end
  end
end
