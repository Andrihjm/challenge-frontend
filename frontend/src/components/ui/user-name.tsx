interface UserNameProps {
  name: string;
}

const UserName = ({ name }: UserNameProps) => {
  return <h1>{name}</h1>;
};
export default UserName;
