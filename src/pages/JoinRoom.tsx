import { useState } from "react"
import Logo from "../components/Logo"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { useNavigate } from "react-router-dom"

const JoinCall = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const handleMeetingID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onSubmit = async () => {
    const meetingLink = id;
    if (meetingLink) {
      navigate(`/home/create/${meetingLink}`, { replace: true});
    }
  }
  return (
    <div className="w-full flex items-center h-svh justify-center">
      {/* <div></div> */}
        <Card className="w-[350px] shadow-xl">
          <CardHeader className="text-center">
            <CardTitle>
              <Logo />
            </CardTitle>
            <CardDescription>Enter Meeting Link.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                <Input
                  id="meeting id"
                  placeholder="Meeting Id"
                  onChange={handleMeetingID}
                />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center w-full">
          <Button variant="secondary" onClick={onSubmit} className="w-full bg-blue-500 text-white font-medium">Join Call</Button>
          </CardFooter>
        </Card>
      </div>
    )
}

export default JoinCall
