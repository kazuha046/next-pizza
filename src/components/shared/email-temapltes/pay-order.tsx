interface Props {
    orderId: number
    totalAmount: number
    paymentUrl: string
}

export const PayOrderTemplate = ({orderId, totalAmount, paymentUrl}: Props) => (
    <div>
        <h1>Order #{orderId}</h1>

        <p>
            Pay the order amount of <b>{totalAmount} ₽</b>. Follow{" "}
            <a href={paymentUrl}>this link</a> to pay for the order.
        </p>
    </div>
)
