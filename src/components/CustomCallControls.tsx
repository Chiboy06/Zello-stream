import {
    CancelCallButton,
    ReactionsButton,
    RecordCallButton,
    ScreenShareButton,
    SpeakingWhileMutedNotification,
    ToggleAudioPublishingButton,
    ToggleVideoPublishingButton,
} from '@stream-io/video-react-sdk';
import CustomBottomSheet from './CustomBottomSheet';
  
import type { CallControlsProps } from '@stream-io/video-react-sdk';
import { useMediaQuery } from 'react-responsive';
import Participant from './Participant';
type CallControlsComponentProps = CallControlsProps & { callId: string };



  
export const CallControls = ({ onLeave, callId }: CallControlsComponentProps) => {
    const isMediumOrLarger = useMediaQuery({ query: '(min-width: 768px)' });
    return (
        <div className="str-video__call-controls gap-2">
            <SpeakingWhileMutedNotification>
                <ToggleAudioPublishingButton />
            </SpeakingWhileMutedNotification>
            <ToggleVideoPublishingButton />
            <ReactionsButton />
            <ScreenShareButton />
            <RecordCallButton />
            <Participant/>
            {!isMediumOrLarger && (
                <CustomBottomSheet channelId={callId} />
            )}
            <CancelCallButton onLeave={onLeave} />
        </div>
    )
};