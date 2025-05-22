import Search from "./search";
import Content from "../tamplates/content";
import SoalContent from "./soal-content";

const ListSoal = () => {
  return (
    <>
      <Search />

      <Content>
        <SoalContent />
      </Content>
    </>
  );
};

export default ListSoal;
