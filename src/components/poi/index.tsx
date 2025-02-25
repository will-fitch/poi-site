import { Box, Button, Checkbox, Container, List, Paper, Text, TextInput } from "@mantine/core";
import L, { LatLng } from "leaflet";
import { CircleMarker, Marker, Popup } from "react-leaflet";

export default class PointOfInterest {
    latlng: LatLng | null;
    name: string;
    isCenter: boolean;

    constructor() {
        this.latlng = null;
        this.name = "New Point";
        this.isCenter = false;
    }

    getListItem() {

        return (
            <Paper withBorder shadow="sm" p={"10px"}>
                <Text fw="bold">{this.name}</Text>
                <TextInput 
                    defaultValue={"rtew"}
                />
                <Button>Stuff and things</Button>
            </Paper>
        );

    }

    getMarker() {

        if( !this.latlng )
            return (
                <></>
            );

        if( this.isCenter )
            return (
                <CircleMarker center={this.latlng} radius={10}>
                    <Popup>{this.name}</Popup>
                </CircleMarker>
            );

        return (
            <Marker position={this.latlng}>
                <Popup>
                    {this.name}
                </Popup>
            </Marker>
        );

    }

}

function editableText() {



}