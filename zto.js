// import { useAppSelector } from '../store/hooks';

// const Dashboard = () => {
//   const token = useAppSelector((state) => state.auth.token);

//   return <div>Your token: {token}</div>;
// };

<Dialog>
<DialogTrigger asChild>
  <Button variant="outline">Edit Profile</Button>
</DialogTrigger>
<DialogContent className="sm:max-w-[425px]">
  <DialogHeader>
    <DialogTitle>Edit profile</DialogTitle>
    <DialogDescription>
      Make changes to your profile here. Click save when you're done.
    </DialogDescription>
  </DialogHeader>
  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
        Name
      </Label>
      <Input id="name" value="Pedro Duarte" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="username" className="text-right">
        Username
      </Label>
      <Input id="username" value="@peduarte" className="col-span-3" />
    </div>
  </div>
  <DialogFooter>
    <Button type="submit">Save changes</Button>
  </DialogFooter>
</DialogContent>
</Dialog>
