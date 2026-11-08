import { useEffect } from "react";
import { ALink } from "../components/ALink";
import { Navbar } from "../components/Navbar";
import { exercicesIndex } from "../data/exercices-index";
//import provisionalMainLinks from "../data/provisional-main-links";
import { uniqueKey } from "../helpers/uniqueKey";
import "./stylesPages.css";

export const MainCatalanofiliaPage = () => {
  /* const getIndex = () => {
    return exercicesIndex;
  };
  let index = getIndex();
*/
  /* let index = exercicesIndex[0]; */

  /*   useEffect(() => {
    index = exercicesIndex;
  }, []); */

  return (
    <>
      <Navbar />
      <main className="main-links">
        {exercicesIndex.map((item) => (
          <p key={uniqueKey()}>{item}</p>
        ))}
        {/*  {index.map((link) => ({
           <ALink
            key={uniqueKey()}
            linkName={link.linkName}
            address={link.address}
            order={link.order}
            folder={link.folder}
          /> 
        }))} */}
      </main>
    </>
  );
};
