import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import {
  DropContainer,
  UploadMessage,
} from "../../styles/ImageUpload.styles.js";
import * as AddingImageActions from "../../redux/actions/AddingImageActions";

const FileContext = createContext({});

export default function Upload(props) {
  const { handleUpload } = useContext(FileContext);
  const [base64s, setBase64s] = useState([]);
  const [imgQty, setImgQty] = useState(null);
  const dispatch = useDispatch();

  function getImageBase64(files) {
    let aux = base64s.map((el) => el);
    files.map((file) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (
          !aux.find(
            (base64) =>
              base64.fileName === file.name &&
              base64.lastModified === file.lastModified
          )
        ) {
          aux.push({
            fileName: file.name,
            lastModified: file.lastModified,
            base64: reader.result,
          });
          setBase64s(aux);
        }
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    });
  }

  useEffect(() => {
    if (base64s) {
      console.log(base64s);
      props.getUploadedImages(base64s);
      dispatch(AddingImageActions.SetPendingImages(base64s));
    }
  }, [base64s]);

  const onDrop = useCallback(
    (files) => {
      setImgQty(files.length);
      getImageBase64(files);
    },
    [handleUpload]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: ["image/jpeg", "image/pjpeg", "image/png", "image/gif"],
      onDrop,
    });

  const renderDragMessage = useCallback(() => {
    if (!isDragActive) {
      return <UploadMessage>Arraste imagens aqui...</UploadMessage>;
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error" className={props.className}>
          Tipo de arquivo não suportado
        </UploadMessage>
      );
    }

    return <UploadMessage type="success">Solte as imagens aqui</UploadMessage>;
  }, [isDragActive, isDragReject]);

  return (
    <DropContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {renderDragMessage()}
    </DropContainer>
  );
}
