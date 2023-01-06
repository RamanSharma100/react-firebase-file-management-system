import { shallowEqual, useSelector } from "react-redux";
import ShowItems from "../ShowItems/ShowItems";

const HomeComponent = () => {
  const { isLoading, userFolders, userFiles } = useSelector(
    (state) => ({
      isLoading: state.filefolders.isLoading,
      userFolders: state.filefolders.userFolders.filter(
        (folder) => folder.data.parent === "root"
      ),
      userFiles: state.filefolders.userFiles.filter(
        (file) => file.data.parent === "root"
      ),
    }),
    shallowEqual
  );

  return (
    <div className="col-md-12 w-100">
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">Loading...</h1>
      ) : (
        <>
          <ShowItems
            title={"Created Folders"}
            type={"folder"}
            items={userFolders}
          />
          <ShowItems
            title={"Created Files"}
            type={"file"}
            items={userFiles.filter((file) => file.data.url === null)}
          />
          <ShowItems
            title={"Uploaded Files"}
            type={"file"}
            items={userFiles.filter((file) => file.data.data === null)}
          />
        </>
      )}
    </div>
  );
};

export default HomeComponent;
