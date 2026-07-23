import {WhiteBlock} from "./white-block"
import {FormInput} from "./form-input"

interface Props {
    className?: string
}

export const CheckoutPersonalForm = ({className}: Props) => {
    return (
        <WhiteBlock title="2. Personal Information" className={className}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormInput name="firstName" className="text-base" placeholder="First Name"/>
                <FormInput name="lastName" className="text-base" placeholder="Last Name"/>
                <FormInput name="email" className="text-base" placeholder="E-Mail"/>
                <FormInput name="phone" className="text-base" placeholder="Phone"/>
            </div>
        </WhiteBlock>
    )
}
