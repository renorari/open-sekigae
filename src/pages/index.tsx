"use client";

import React, { useEffect, useState } from "react";

import { Box, IconButton, Typography, Sheet, Card, Avatar, CardContent, Skeleton, CardActions, Button, ButtonGroup } from "@mui/joy";
import { KeyboardArrowLeft, KeyboardArrowRight, SettingsRounded } from "@mui/icons-material";

import AnimeSwitch from "../components/AnimeSwitch";

interface Member {
    name: string;
    pronouns: string;
}

export default function HomePage() {
    const [seatRows, setSeatRows] = useState<number | null>(null);
    const [seatColumns, setSeatColumns] = useState<number | null>(null);
    const [seatRowsSpacer, setSeatRowsSpacer] = useState<number | null>(null);
    const [seatColumnsSpacer, setSeatColumnsSpacer] = useState<number | null>(null);
    const [seatFrontThreshold, setSeatFrontThreshold] = useState<number | null>(null);
    const [viewFrontTable, setViewFrontTable] = useState<boolean | null>(null);
    const [disabledSeats, setDisabledSeats] = useState<Map<string, boolean> | null>(null);
    const [seats, setSeats] = useState<Map<string, number> | null>(null);
    const [next, setNext] = useState<number | null>(null);
    const [members, setMembers] = useState<Map<number, Member> | null>(null);

    useEffect(() => {
        // 仮データ
        setMembers(new Map([
            [
                12,
                {
                    "name": "名無しの権兵衛",
                    "pronouns": "ななしのごんべえ"
                }
            ],
            [
                13,
                {
                    "name": "名無しの権兵衛2",
                    "pronouns": "ななしのごんべえ つー"
                }
            ]
        ]));
        setNext(12);
        setSeatRows(8);
        setSeatColumns(6);
        setSeatRowsSpacer(0);
        setSeatColumnsSpacer(2);
        setSeatFrontThreshold(2);
        setViewFrontTable(true);
        setSeats(new Map([
            ["1-1", 1],
            ["1-2", 2],
            ["1-3", 3],
            ["1-4", 4],
            ["1-5", 5],
            ["1-6", 6],
            ["2-1", 7],
            ["2-2", 8],
            ["2-3", 9],
            ["2-4", 10],
            ["2-5", 11],
            ["2-6", 12]
        ]));
        setDisabledSeats(new Map([
            ["8-1", true],
            ["8-2", true],
            ["8-5", true],
            ["8-6", true]
        ]));
    }, []);

    const row = seatRows || 0;
    const column = seatColumns || 0;
    const rowsSpacer = !seatRowsSpacer ? row : seatRowsSpacer;
    const columnsSpacer = !seatColumnsSpacer ? column : seatColumnsSpacer;

    return (
        <Box display="flex" flexDirection="column" sx={{ "minHeight": "100vh" }}>

            {/* Header */}
            <Sheet
                component="header"
                sx={{
                    "width": "100%",
                    "p": 2,
                    "display": "flex",
                    "alignItems": "center",
                    "borderBottom": "1px solid",
                    "borderColor": "divider"
                }}>
                <Typography level="h1" sx={{ "flexGrow": 1, "fontSize": "1.5rem" }}>
                    <img src="/images/logo.svg" alt="Open Sékigae" style={{ "height": "1em", "verticalAlign": "middle" }} />
                </Typography>
                <IconButton style={{ "borderRadius": "100vw" }} aria-label="Settings">
                    <SettingsRounded color="primary" />
                </IconButton>
            </Sheet>

            {/* Main */}
            <Box display="flex" sx={{ "flex": "1", "p": 2, "gap": 2 }}>

                {/* Sidebar */}
                <Box display="flex" flexDirection="column" sx={{ "gap": 2 }}>

                    {/* members list */}
                    <Card sx={{ "flex": "1" }}>

                        {/* next person */}
                        <Card>
                            <CardContent>
                                <Box display="flex" sx={{ "gap": 2, "alignItems": "center" }}>
                                    <Avatar size="lg">
                                        <Skeleton loading={!next} animation="wave">
                                            {next ? next : "?"}
                                        </Skeleton>
                                    </Avatar>
                                    <Box display="flex" flexDirection="column" sx={{ "flexGrow": 1 }}>
                                        <Typography>
                                            <Skeleton loading={!next} animation="wave">
                                                {next ? members?.get(next)?.pronouns : "名無しの権兵衛の代名詞"}
                                            </Skeleton>
                                        </Typography>
                                        <Typography level="h2">
                                            <Skeleton loading={!next} animation="wave">
                                                {next ? members?.get(next)?.name : "名無しの権兵衛"}
                                            </Skeleton>
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <ButtonGroup variant="soft" >
                                    <IconButton>
                                        <KeyboardArrowLeft />
                                    </IconButton>
                                    <IconButton>
                                        <KeyboardArrowRight />
                                    </IconButton>
                                </ButtonGroup>
                                <Button variant="outlined">手動設定</Button>
                                <Button endDecorator={<KeyboardArrowRight />} disabled={!next || !!seats?.values().find(seat => seat === next)}>抽選開始</Button>
                            </CardActions>
                        </Card>
                    </Card>

                    {/* settings */}
                    <Card>
                        <Typography component="label" startDecorator={<AnimeSwitch />}>
                            自動抽選
                        </Typography>
                        <Typography component="label" startDecorator={<AnimeSwitch />}>
                            前寄り指定
                        </Typography>
                    </Card>
                </Box>

                {/* Seats */}
                <Box display="flex" flexDirection="column" sx={{ "flex": "1", "gap": 2 }}>

                    {/* Seat Grid */}
                    <Card variant="outlined" sx={{ 
                        "flex": 1, 
                        "display": "flex",
                        "p": 2,
                        "overflow": "hidden"
                    }}>
                        {viewFrontTable && (
                            <Card sx={{ "width": "50%", "margin": "0 auto" }} variant="soft">
                                <CardContent>
                                    <Typography textAlign="center">
                                        教卓
                                    </Typography>
                                </CardContent>
                            </Card>
                        )}
                        <Skeleton loading={!seatRows || !seatColumns} animation="wave" sx={{ "flex": 1, "margin": -2 }}>
                            <Box display="flex" flexDirection="column" sx={{ "gap": 2, "flex": 1 }}>
                                {Array.from({ "length": row + row/rowsSpacer - 1}).map((_, rowIndex) => (
                                    <Box key={rowIndex} display="flex" flexDirection="row" sx={{ "gap": 2, "flexGrow": rowIndex % (rowsSpacer + 1) === rowsSpacer ? 0 : 1 }}>
                                        {Array.from({ "length": column + column/columnsSpacer - 1 }).map((_, colIndex) => (
                                            (rowIndex % (rowsSpacer + 1) === rowsSpacer || colIndex % (columnsSpacer + 1) === columnsSpacer) ? (
                                                <Box key={`${rowIndex}-${colIndex}`}  sx={{"minWidth": "1rem", "minHeight": "1rem"}} />
                                            ) : ((() => {
                                                let realRow = 0;
                                                let realCol = 0;

                                                for (let r = 0; r <= rowIndex; r++) {
                                                    if (r % (rowsSpacer + 1) !== rowsSpacer) realRow++;
                                                }

                                                for (let c = 0; c <= colIndex; c++) {
                                                    if (c % (columnsSpacer + 1) !== columnsSpacer) realCol++;
                                                }

                                                return (
                                                    <Card key={`${rowIndex}-${colIndex}`} sx={{ "flex": 1, "height": "100%", "opacity": disabledSeats?.get(`${realRow}-${realCol}`) ? 0.25 : 1 }} id={`seat-${realRow}-${realCol}`} variant="soft" color={seatFrontThreshold && realRow <= seatFrontThreshold ? "primary" : "neutral"}>
                                                        <CardContent sx={{ "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                                                            <Typography level="h1">
                                                                {(() => {
                                                                    const seatNumber = seats?.get(`${realRow}-${realCol}`);
                                                                    return seatNumber ? seatNumber : (<>&nbsp;</>);
                                                                })()}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                );
                                            })()
                                            )
                                        ))}
                                    </Box>
                                ))}
                            </Box>
                        </Skeleton>
                    </Card>

                </Box>

            </Box>

        </Box>
    );
}
