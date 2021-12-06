import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ButtonBase, Grid } from "@material-ui/core";
import { phoneNumberFormatter } from "../services/General";
import propertyCardStyles from "../styles/PropertyCard.module.css";
import { useSelector } from "react-redux";
import ReportProblemSharpIcon from "@material-ui/icons/ReportProblemSharp";
import Tooltip from "@material-ui/core/Tooltip";

export default function PropertyCard(props) {
  const [isActive, setIsActive] = React.useState(false);
  const propertySelector = useSelector((state) => state.PropertyReducer);

  const handleClick = () => {
    props.onClickFunction();
    setIsActive(!isActive);
  };

  React.useEffect(() => {
    setIsActive(propertySelector.activeProperty === props.data);
  }, [propertySelector.activeProperty]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={isActive ? propertyCardStyles.activeCard : ""}>
        <ButtonBase
          onClick={handleClick}
          className={propertyCardStyles.buttonBase}
        >
          <Grid container direction="column">
            <CardMedia
              component="img"
              height="140"
              image={
                props.data.imagemImovelDtoList[0]?.imagemBase64
                  ? "data:image/png;base64," +
                    props.data.imagemImovelDtoList[0]?.imagemBase64
                  : "https://django-metabuscador.s3.amazonaws.com/static/home/images/no-photo.png"
              }
            />
            <CardContent className={propertyCardStyles.cardContent}>
              <Typography gutterBottom variant="h6" component="div">
                {props.data.preco.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Typography>
              <Typography variant="body2">{props.data.endereco}</Typography>
              <Typography variant="body2">{props.data.bairro}</Typography>
              <Typography variant="body2">{props.data.cidade}</Typography>
              <br />
              <Typography variant="body2">
                {props.data.proprietario.nome}
              </Typography>
              <Typography variant="body2">
                {phoneNumberFormatter(props.data.proprietario.telefone)}
              </Typography>
              {!props.data.flInativo == "S" && (
                <Tooltip
                  title="A propriedade não foi atualizada há mais de 90 dias!"
                  aria-label="add"
                >
                  <ReportProblemSharpIcon
                    className={propertyCardStyles.alertIcon}
                  />
                </Tooltip>
              )}
            </CardContent>
          </Grid>
        </ButtonBase>
      </Card>
    </Grid>
  );
}
