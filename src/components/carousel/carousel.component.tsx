import React, { PureComponent } from "react";
import { DEFAULT_PET_IMAGE } from "../../constants/constants";
import { Carousel } from "react-bootstrap";

export const CarouselPet = (props: any) => {
  const { pets } = props;

  return (
    <Carousel className="p-0 wh-100 vh-5 ">
      {pets.map((pet: any) => {
        return (
          <Carousel.Item interval={2000}>
            <div
              style={{
                backgroundImage: `url('${
                  pet.img_url ? pet.img_url : DEFAULT_PET_IMAGE
                }')`,
                height: "60vh",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            ></div>
            <Carousel.Caption>
              <h3>{pet.nombre}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};
