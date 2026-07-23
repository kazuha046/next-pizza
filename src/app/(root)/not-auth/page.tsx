import {InfoBlock} from "@/components/shared/info-block"

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center mt-16 sm:mt-40">
            <InfoBlock
                title="Access Denied"
                text="Only authorized users can view this page"
                imageUrl="/assets/images/lock.png"
            />
        </div>
    )
}
