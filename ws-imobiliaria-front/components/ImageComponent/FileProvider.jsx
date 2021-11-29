import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { v4 as uuidv4 } from "uuid";
import filesize from "filesize";


const FileProvider = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // useEffect(() => {
  //   api.get("posts").then((response) => {
  //     const postFormatted= response.data.map((post) => {
  //       return {
  //         ...post,
  //         id: post._id,
  //         preview: post.url,
  //         readableSize: filesize(post.size),
  //         file: null,
  //         error: false,
  //         uploaded: true,
  //       };
  //     });

  //     setUploadedFiles(postFormatted);
  //   });
  // }, []);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  });

  const updateFile = useCallback((id, data) => {
    setUploadedFiles((state) =>
      state.map((file) => (file.id === id ? { ...file, ...data } : file))
    );
  }, []);

  const processUpload = useCallback(
    (uploadedFile) => {
      const data = new FormData();
      if (uploadedFile.file) {
        data.append("file", uploadedFile.file, uploadedFile.name);
      }

      api
        .post("posts", data, {
          onUploadProgress: (progressEvent) => {
            let progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            console.log(
              `A imagem ${uploadedFile.name} está ${progress}% carregada... `
            );

            updateFile(uploadedFile.id, { progress });
          },
        })
        .then((response) => {
          console.log(
            `A imagem ${uploadedFile.name} já foi enviada para o servidor!`
          );

          updateFile(uploadedFile.id, {
            uploaded: true,
            id: response.data._id,
            url: response.data.url,
          });
        })
        .catch((err) => {
          console.error(
            `Houve um problema para fazer upload da imagem ${uploadedFile.name} no servidor AWS`
          );
          console.log(err);

          updateFile(uploadedFile.id, {
            error: true,
          });
        });
    },
    [updateFile]
  );

  const handleUpload = useCallback(
    (files) => {
      const newUploadedFiles = files.map((file) => ({
        file,
        id: uuidv4(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: "",
      }));

      // concat é mais performático que ...spread
      // https://www.malgol.com/how-to-merge-two-arrays-in-javascript/
      setUploadedFiles((state) => state.concat(newUploadedFiles));
      newUploadedFiles.forEach(processUpload);
    },
    [processUpload]
  );

  const deleteFile = useCallback((id) => {
    api.delete(`posts/${id}`);
    setUploadedFiles((state) => state.filter((file) => file.id !== id));
  }, []);

  return (
    <FileContext.Provider value={{ uploadedFiles, deleteFile, handleUpload }}>
      {children}
    </FileContext.Provider>
  );
};

export { FileProvider };
