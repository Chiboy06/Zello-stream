import { MessageSquare } from 'lucide-react';
import ChatView from './ChatView'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'

interface Props {
    channelId: string;
}

const CustomBottomSheet = ({ channelId }: Props) => {
  return (
    <Sheet>
        <SheetTrigger>
            <MessageSquare className='w-10 h-10 bg-[#19232d] p-2 rounded-full' />
        </SheetTrigger>
        <SheetContent side={'bottom'}>
            <SheetHeader>
            <SheetTitle>Chat</SheetTitle>
            <SheetDescription>
                <ChatView channelId={channelId}/>
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>

  )
}

export default CustomBottomSheet