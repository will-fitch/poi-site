import React from 'react';
import { AppShell, Box, Button, Container, Flex, Grid, Group, List, Paper, Stack, Text, TextInput } from '@mantine/core';
import MapDisplay from '../../components/map';
import PointOfInterest from '../../components/poi';
import { LatLng, Point, point } from 'leaflet';
import { AngledText, Background } from '../../components/svg';

import { IconTrashX } from '@tabler/icons-react';
import { IconPencil } from '@tabler/icons-react';

import { ReactComponent as LogoSVG } from '../../CatchingFeatures.svg';
import { redirect } from 'react-router-dom';

export default function Customize() {

    const initialPoint = new PointOfInterest();
    initialPoint.latlng = new LatLng(43.748008186748926, -70.03136157989503);
    initialPoint.name = "Center";
    const [pointsOfInterest, setPOIs] = React.useState<PointOfInterest[]>([initialPoint]);

    const [activePOI, setActivePOI] = React.useState<PointOfInterest | null>(null);

    return (
        <AppShell
            header={{ height: 120 }}
            navbar={{
                width: 300,
                breakpoint: 'sm'

            }}
            padding="md"
        >
            <AppShell.Header>
                {Header()}
            </AppShell.Header>

            <AppShell.Navbar>
                {Navbar(pointsOfInterest, setPOIs, activePOI, setActivePOI)}
            </AppShell.Navbar>

            <AppShell.Main>
                {CustomizeMain(pointsOfInterest, setPOIs, activePOI, setActivePOI)}
            </AppShell.Main>

        </AppShell>
    )

}

function CustomizeMain(pointsOfInterest: PointOfInterest[], setPOIs: React.Dispatch<React.SetStateAction<PointOfInterest[]>>, activePOI: PointOfInterest | null, setActivePOI: React.Dispatch<React.SetStateAction<PointOfInterest | null>>) {

    var SVGElems: JSX.Element[] = [];
    console.log("HERE A");
    if(pointsOfInterest.length > 0 && pointsOfInterest[0].latlng) {
        console.log("HERE B");
        let φ1 = pointsOfInterest[0].latlng.lat;
        let λ1 = pointsOfInterest[0].latlng.lng;

        pointsOfInterest.forEach((poi) => {
            console.log("HERE C");
            if(!poi.latlng) {
                return;
            }
            console.log("HERE D");
            if(poi === pointsOfInterest[0]) {
                return;
            }
            console.log("HERE E");
            let φ2 = poi.latlng.lat;
            let λ2 = poi.latlng.lng;

            const y = Math.sin(λ2-λ1) * Math.cos(φ2);
            const x = Math.cos(φ1)*Math.sin(φ2) -
                    Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
            const θ = Math.atan2(y, x);
            const brng = (θ*180/Math.PI + 360) % 360; // in degrees
            const ang = brng+270;



            const R = 6371e3; // metres
            const a1 = φ1 * Math.PI/180; // φ, λ in radians
            const b2 = φ2 * Math.PI/180;
            const Δφ = (φ2-φ1) * Math.PI/180;
            const Δλ = (λ2-λ1) * Math.PI/180;

            const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            const d = R * c; // in metres
            const km = d / 1000;

            SVGElems.push( AngledText(poi.name+" - "+km.toPrecision(3)+" km", ang) );
        });
    }

    return (
        <Group>
            <Box h={'600'} w={'600'}>
                <MapDisplay points={pointsOfInterest} onClick={(ll: LatLng) => { if(activePOI !== null) { activePOI.latlng = ll; setPOIs([ ...pointsOfInterest ]); } }}/>
            </Box>
            <Box>
                {Background(600, 600, SVGElems)}
            </Box>
        </Group>
    );
}

function Navbar(pointsOfInterest: PointOfInterest[], setPOIs: React.Dispatch<React.SetStateAction<PointOfInterest[]>>, activePOI: PointOfInterest | null, setActivePOI: React.Dispatch<React.SetStateAction<PointOfInterest | null>>) {

    const removePOI = (poi: PointOfInterest) => {

        const newPOIs = pointsOfInterest.filter(function (eachPOI) {
            return eachPOI !== poi;
        });
        setPOIs(newPOIs);

    }

    const getListItem = (poi: PointOfInterest) => {

        if(pointsOfInterest.length > 0 && pointsOfInterest[0] === poi) {
            poi.isCenter = true;
        } else {
            poi.isCenter = false;
        }

        if(activePOI === poi) {
            return (
                <Paper withBorder radius={0} p='sm' w="100%" bg={poi.isCenter? 'green' : 'lightblue'}>
                <Flex w={"100%"}>
                    <Stack w={"100%"}>
                        <TextInput defaultValue={poi.name} onChange={(event) => { poi.name = event.currentTarget.value; setPOIs([ ...pointsOfInterest ]); }} width={"100%"}/>
                        <Text>{poi.latlng?.lat}, {poi.latlng?.lng}</Text>
                    </Stack>
                    <Flex justify={'flex-end'}>
                    <Stack>
                        <Button variant='transparent' onClick={() => setActivePOI(null)}><IconPencil /></Button>
                        <Button variant='transparent' onClick={() => removePOI(poi)} c="red"><IconTrashX /></Button>
                    </Stack>
                    </Flex>
                </Flex>
                </Paper>
            );
        }

        return (
          <Paper withBorder radius={0} p='sm' bg={poi.isCenter? 'lightgreen' : 'white'}>
            <Flex w={"100%"}>
                <Stack w={"100%"}>
                    <Text p="sm" fw="bold" size="sm">{poi.name}</Text>
                    <Text>{poi.latlng?.lat}, {poi.latlng?.lng}</Text>
                </Stack>
                <Flex justify={'flex-end'}>
                <Stack>
                    <Button variant='transparent' onClick={() => setActivePOI(poi)}><IconPencil /></Button>
                    <Button variant='transparent' onClick={() => removePOI(poi)} c="red"><IconTrashX /></Button>
                </Stack>
                </Flex>
            </Flex>
          </Paper>
        );
    }

    function addPOI() {
        const newPOIs = [ ...pointsOfInterest ];
        const newPOI = new PointOfInterest();
        setActivePOI(newPOI);
        newPOIs.push(newPOI);
        setPOIs(newPOIs);
    }

    return (
        <div>
        { pointsOfInterest.map((poi) => getListItem(poi)) }
        <Paper withBorder radius={0} p='sm'>
            <Button onClick={() => addPOI()}>Add new Point</Button>    
        </Paper>
        </div>
        
    );

}

function Header() {
    
    return (
        <LogoSVG height={"100%"} onClick={() => redirect("/")}/>
    );

}