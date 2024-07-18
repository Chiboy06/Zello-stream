import { ShareIcon } from "lucide-react"
import { RWebShare } from "react-web-share"
import { toast } from "sonner"

type Props = {
    id: string;
}

const CustomShareButton = ({ id }: Props) => {
  return (
    <div className="w-12 flex text-sm justify-center font-bold gap-x-1 items-center content-center bg-[#19232d] p-2 rounded-full">
        <RWebShare
              data={{
                  text: `Join my meeting at https://zello-stream.vercel.app/home/create/${id}`,
                  url: `https://zello-stream.vercel.app/home/create/${id}`,
                  title: "Zello Stream"
            }}
            onClick={() => toast("Shared Successful")}
        >
            <ShareIcon className="w-5 h-5 text-sm"/>
        </RWebShare>
    </div>
  )
}

export default CustomShareButton