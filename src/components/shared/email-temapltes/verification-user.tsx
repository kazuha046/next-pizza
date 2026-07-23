interface Props {
    code: string;
}

export const VerificationUserTemplate = ({code}: Props) => (
    <div>
        <p>
            Verification code: <h2>{code}</h2>
        </p>

        <p>
            <a href={`${process.env.NEXT_PUBLIC_SITE_HOST}/api/auth/verify?code=${code}`}>Confirm registration</a>
        </p>
    </div>
)
