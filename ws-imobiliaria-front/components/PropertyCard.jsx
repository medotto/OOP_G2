import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { phoneNumberFormatter } from "../services/General";

export default function PropertyCard(props) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={
            props.data.imagemImovelDtoList[0]?.imagemBase64
              ? "data:image/png;base64," +
                props.data.imagemImovelDtoList[0]?.imagemBase64
              : "https://picsum.photos/1920/1080?random=1"
          }
        />
        <CardContent>
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
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Grid>
  );
}
