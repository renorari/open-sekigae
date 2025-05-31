"use client";

import "../styles/main.css";

import React, { useEffect, useState } from "react";

import { KeyboardArrowLeft, KeyboardArrowRight, SettingsRounded } from "@mui/icons-material";
import {
    Avatar, Box, Button, ButtonGroup, Card, CardActions, CardContent, IconButton, List, ListItem,
    Modal, ModalClose, ModalDialog, Sheet, Skeleton, Typography
} from "@mui/joy";

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

    const [autoLottery, setAutoLottery] = useState<boolean>(false);
    const [frontSelect, setFrontSelect] = useState<boolean>(false);
    const [autoLotteryInterval, setAutoLotteryInterval] = useState<number>(1000);
    const [animationSteps, setAnimationSteps] = useState<number>(10);
    const [seatSettingModalOpen, setSeatSettingModalOpen] = useState<boolean>(false);

    const [rollAudio, setRollAudio] = useState<HTMLAudioElement | null>(null);
    const [rollCloseAudio, setRollCloseAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        // 音声のロード
        setRollAudio(new Audio("/sounds/roll.mp3"));
        setRollCloseAudio(new Audio("/sounds/roll-close.mp3"));

        // 仮データ
        setMembers(new Map([
            [
                1,
                {
                    "name": "佐々木優太",
                    "pronouns": "ささきゆうた"
                }
            ],
            [
                2,
                {
                    "name": "山本和子",
                    "pronouns": "やまもとかずこ"
                }
            ],
            [
                3,
                {
                    "name": "中村健太郎",
                    "pronouns": "なかむらけんたろう"
                }
            ],
            [
                4,
                {
                    "name": "小川美穂",
                    "pronouns": "おがわみほ"
                }
            ],
            [
                5,
                {
                    "name": "井上大輔",
                    "pronouns": "いのうえだいすけ"
                }
            ],
            [
                6,
                {
                    "name": "斎藤千尋",
                    "pronouns": "さいとうちひろ"
                }
            ],
            [
                7,
                {
                    "name": "松本龍太",
                    "pronouns": "まつもとりゅうた"
                }
            ],
            [
                8,
                {
                    "name": "吉田桃子",
                    "pronouns": "よしだももこ"
                }
            ],
            [
                9,
                {
                    "name": "清水拓也",
                    "pronouns": "しみずたくや"
                }
            ],
            [
                10,
                {
                    "name": "石川奈々",
                    "pronouns": "いしかわなな"
                }
            ],
            [
                11,
                {
                    "name": "木村聡太",
                    "pronouns": "きむらそうた"
                }
            ],
            [
                12,
                {
                    "name": "山田太郎",
                    "pronouns": "やまだたろう"
                }
            ],
            [
                13,
                {
                    "name": "佐藤花子",
                    "pronouns": "さとうはなこ"
                }
            ],
            [
                14,
                {
                    "name": "鈴木一郎",
                    "pronouns": "すずきいちろう"
                }
            ],
            [
                15,
                {
                    "name": "田中美咲",
                    "pronouns": "たなかみさき"
                }
            ],
            [
                16,
                {
                    "name": "高橋健太",
                    "pronouns": "たかはしけんた"
                }
            ],
            [
                17,
                {
                    "name": "伊藤優子",
                    "pronouns": "いとうゆうこ"
                }
            ],
            [
                18,
                {
                    "name": "渡辺翔太",
                    "pronouns": "わたなべしょうた"
                }
            ],
            [
                19,
                {
                    "name": "小林明日香",
                    "pronouns": "こばやしあすか"
                }
            ],
            [
                20,
                {
                    "name": "加藤雄大",
                    "pronouns": "かとうゆうだい"
                }
            ],
            [
                21,
                {
                    "name": "中野直樹",
                    "pronouns": "なかのなおき"
                }
            ],
            [
                22,
                {
                    "name": "遠藤さくら",
                    "pronouns": "えんどうさくら"
                }
            ],
            [
                23,
                {
                    "name": "藤田隆一",
                    "pronouns": "ふじたりゅういち"
                }
            ],
            [
                24,
                {
                    "name": "長谷川真理",
                    "pronouns": "はせがわまり"
                }
            ],
            [
                25,
                {
                    "name": "村上誠司",
                    "pronouns": "むらかみせいじ"
                }
            ],
            [
                26,
                {
                    "name": "大野綾香",
                    "pronouns": "おおのあやか"
                }
            ],
            [
                27,
                {
                    "name": "西村拓海",
                    "pronouns": "にしむらたくみ"
                }
            ],
            [
                28,
                {
                    "name": "松田恵子",
                    "pronouns": "まつだけいこ"
                }
            ],
            [
                29,
                {
                    "name": "野口達也",
                    "pronouns": "のぐちたつや"
                }
            ],
            [
                30,
                {
                    "name": "岡田千晶",
                    "pronouns": "おかだちあき"
                }
            ],
            [
                31,
                {
                    "name": "白石優介",
                    "pronouns": "しらいしゆうすけ"
                }
            ],
            [
                32,
                {
                    "name": "三浦結衣",
                    "pronouns": "みうらゆい"
                }
            ],
            [
                33,
                {
                    "name": "近藤健一",
                    "pronouns": "こんどうけんいち"
                }
            ],
            [
                34,
                {
                    "name": "市川彩花",
                    "pronouns": "いちかわあやか"
                }
            ],
            [
                35,
                {
                    "name": "原田智樹",
                    "pronouns": "はらだともき"
                }
            ],
            [
                36,
                {
                    "name": "坂本美優",
                    "pronouns": "さかもとみゆう"
                }
            ],
            [
                37,
                {
                    "name": "杉山雄介",
                    "pronouns": "すぎやまゆうすけ"
                }
            ],
            [
                38,
                {
                    "name": "前田明日香",
                    "pronouns": "まえだあすか"
                }
            ],
            [
                39,
                {
                    "name": "森本大輔",
                    "pronouns": "もりもとだいすけ"
                }
            ],
            [
                40,
                {
                    "name": "内田麻衣",
                    "pronouns": "うちだまい"
                }
            ],
            [
                41,
                {
                    "name": "青木龍也",
                    "pronouns": "あおきたつや"
                }
            ],
            [
                42,
                {
                    "name": "宮崎春菜",
                    "pronouns": "みやざきはるな"
                }
            ],
            [
                43,
                {
                    "name": "横山裕太",
                    "pronouns": "よこやまゆうた"
                }
            ],
            [
                44,
                {
                    "name": "本田理沙",
                    "pronouns": "ほんだりさ"
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
            // ["1-5", 5],
            // ["1-6", 6],
            // ["2-1", 7],
            // ["2-2", 8],
            ["2-3", 9],
            ["2-4", 10],
            ["2-5", 11],
            ["2-6", 12],
            ["3-1", 13],
            ["3-2", 14],
            ["3-3", 15],
            ["3-4", 16],
            ["3-5", 17],
            ["3-6", 18]
            // ["4-1", 19],
            // ["4-2", 20],
            // ["4-3", 21],
            // ["4-4", 22],
            // ["4-5", 23],
            // ["4-6", 24],
            // ["5-1", 25],
            // ["5-2", 26],
            // ["5-3", 27],
            // ["5-4", 28],
            // ["5-5", 29],
            // ["5-6", 30],
            // ["6-1", 31],
            // ["6-2", 32],
            // ["6-3", 33],
            // ["6-4", 34],
            // ["6-5", 35],
            // ["6-6", 36],
            // ["7-1", 37],
            // ["7-2", 38],
            // ["7-3", 39],
            // ["7-4", 40],
            // ["7-5", 41],
            // ["7-6", 42],
            // ["8-3", 43],
            // ["8-4", 44]
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
    const allSeats = Array.from({ "length": !frontSelect ? row * column : (seatFrontThreshold || row) * column }, (_, i) => {
        return `${Math.floor(i / column) + 1}-${(i % column) + 1}`;
    });

    // 自動抽選のuseEffect
    useEffect(() => {
        if (!autoLottery || !next || !members || !seats) return;

        // 全員の席が決まっているかチェック
        const assignedMembers = Array.from(seats.values());
        if (assignedMembers.length >= members.size) {
            setAutoLottery(false);
            return;
        }

        // 現在の人がすでに席が決まっているかチェック
        if (assignedMembers.includes(next)) {
            // 次の人に進む
            const nextMember = next < members.size ? next + 1 : 1;
            setNext(nextMember);
            return;
        }

        const timer = setTimeout(() => {
            lottery(next);
        }, autoLotteryInterval);

        return () => clearTimeout(timer);
    }, [autoLottery, next, members, seats, autoLotteryInterval]);

    function lottery(number: number) {
        if (!seats || !next) return;

        const availableSeats = allSeats.filter(seat => !seats.has(seat) && !disabledSeats?.get(seat));
        if (availableSeats.length === 0) {
            alert("空いている席がありません。");
            setAutoLottery(false);
            return;
        }

        const assignedMembers = Array.from(seats.values());
        if (assignedMembers.includes(number)) {
            return;
        }

        // 最終的に選ばれる座席を先に決定
        const selectedSeat = availableSeats[Math.floor(Math.random() * availableSeats.length)] as string;

        // アニメーション用の座席状態を保存
        const originalSeats = new Map(seats);

        // 抽選アニメーション
        rollAudio?.play().catch(() => { });
        let animationStep = 0;
        const animateStep = () => {
            if (animationStep < animationSteps) {
                // アニメーション中はランダムな座席を表示
                const randomSeat = availableSeats[Math.floor(Math.random() * availableSeats.length)] as string;
                setSeats(new Map(originalSeats).set(randomSeat, number));
                animationStep++;
                setTimeout(animateStep, 100);
            } else {
                // アニメーション完了後、最終的な座席を設定
                rollAudio?.pause();
                if (rollAudio) rollAudio.currentTime = 0;
                if (rollCloseAudio) rollCloseAudio.currentTime = 0;
                rollCloseAudio?.play().catch(() => { });
                setSeats(new Map(originalSeats).set(selectedSeat, number));
                if (next !== members?.size) {
                    setNext(next + 1);
                } else {
                    setNext(1);
                }
            }
        };

        animateStep();
    }

    return (
        <Box className="container" display="flex" flexDirection="column" sx={{ "minHeight": "100vh" }}>

            {/* Header */}
            <Sheet
                className="header"
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
            <Box className="main" display="flex" sx={{ "flex": "1", "p": 2, "gap": 2 }}>

                {/* Sidebar */}
                <Box className="sidebar" display="flex" flexDirection="column" sx={{ "gap": 2 }}>

                    {/* members list */}
                    <Card className="members-list-container" sx={{ "flex": "1" }}>

                        {/* next person */}
                        <Card className="next-person">
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
                                    <IconButton onClick={() => { setNext(next ? next - 1 : null); }} disabled={!next || next <= 1}>
                                        <KeyboardArrowLeft />
                                    </IconButton>
                                    <IconButton onClick={() => { setNext(next ? next + 1 : null); }} disabled={!next || next >= (members ? members.size : 0)}>
                                        <KeyboardArrowRight />
                                    </IconButton>
                                </ButtonGroup>
                                <Button variant="outlined" onClick={() => setSeatSettingModalOpen(true)} disabled={!next}>手動設定</Button>
                                <Button endDecorator={<KeyboardArrowRight />} disabled={!next || !!seats?.values().find(seat => seat === next) || autoLottery} onClick={() => {
                                    if (!next) return;
                                    lottery(next);
                                }}>{autoLottery ? "抽選中…" : "抽選開始"}</Button>
                            </CardActions>

                            <Modal open={seatSettingModalOpen} onClose={() => setSeatSettingModalOpen(false)}>
                                <ModalDialog>
                                    <ModalClose />
                                    <Box display="flex" sx={{ "gap": 2, "alignItems": "center" }}>
                                        <Avatar size="lg">
                                            {next}
                                        </Avatar>
                                        <Box display="flex" flexDirection="column" sx={{ "flexGrow": 1 }}>
                                            <Typography>
                                                {members?.get(next || 0)?.pronouns}
                                            </Typography>
                                            <Typography level="h2">
                                                {members?.get(next || 0)?.name}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box display="grid" sx={{ "gridTemplateColumns": `repeat(${column}, 1fr)`, "gap": 2 }}>
                                        {Array.from({ "length": row * column }).map((_, index) => {
                                            const seatNumber = `${Math.floor(index / column) + 1}-${(index % column) + 1}`;
                                            return (
                                                <Button
                                                    key={seatNumber}
                                                    variant="outlined"
                                                    disabled={!!disabledSeats?.get(seatNumber) || !!seats?.has(seatNumber)}
                                                    onClick={() => {
                                                        if (!next || !members) return;
                                                        const newSeats = new Map(seats);

                                                        if (Array.from(newSeats.values()).includes(next)) {
                                                            // 既に選択されている場合は削除
                                                            newSeats.forEach((value, key) => {
                                                                if (value === next) {
                                                                    newSeats.delete(key);
                                                                }
                                                            });
                                                        }

                                                        if (newSeats.has(seatNumber)) {
                                                            newSeats.delete(seatNumber);
                                                        } else {
                                                            newSeats.set(seatNumber, next);
                                                        }

                                                        setSeats(newSeats);
                                                    }}>
                                                    {seatNumber}
                                                </Button>
                                            );
                                        })}
                                    </Box>

                                    <Box
                                        sx={{
                                            "mt": 1,
                                            "display": "flex",
                                            "gap": 1,
                                            "flexDirection": { "xs": "column", "sm": "row-reverse" }
                                        }}
                                    >
                                        <Button variant="solid" color="primary" onClick={() => setSeatSettingModalOpen(false)}>
                                            決定
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="danger"
                                            disabled={!Array.from(seats?.values() || []).includes(next || 0)}
                                            onClick={() => {
                                                if (!next || !seats) return;

                                                const newSeats = new Map(seats);
                                                newSeats.forEach((value, key) => {
                                                    if (value === next) {
                                                        newSeats.delete(key);
                                                    }
                                                });
                                                setSeats(newSeats);

                                                setSeatSettingModalOpen(false);
                                            }}>
                                            削除
                                        </Button>
                                    </Box>
                                </ModalDialog>
                            </Modal>
                        </Card>

                        {/* members list */}
                        <List className="members-list" sx={{ "height": "0px", "overflowY": "scroll", "flexGrow": 1 }}>
                            <Skeleton loading={!members} animation="wave">
                                {Array.from(members || []).map(([id, member]) => (
                                    <ListItem key={id} sx={{ "justifyContent": "space-between" }}>
                                        <Box display="flex" sx={{ "gap": 2, "alignItems": "center" }}>
                                            <Avatar size="sm" color={Array.from(seats?.values() || []).includes(id) ? "neutral" : "primary"}>
                                                {id}
                                            </Avatar>
                                            <Box display="flex" flexDirection="column">
                                                <Typography>{member.pronouns}</Typography>
                                                <Typography level="title-lg">{member.name}</Typography>
                                            </Box>
                                        </Box>
                                        <Button variant="outlined" onClick={() => { setNext(id); }} disabled={next === id}>
                                            選択
                                        </Button>
                                    </ListItem>
                                ))}
                            </Skeleton>
                        </List>
                    </Card>

                    {/* settings */}
                    <Card className="lottery-settings">
                        <Typography component="label" startDecorator={<AnimeSwitch checked={autoLottery} onChange={() => setAutoLottery(!autoLottery)} />}>
                            自動抽選
                        </Typography>
                        <Typography component="label" startDecorator={<AnimeSwitch checked={frontSelect} onChange={() => setFrontSelect(!frontSelect)} />}>
                            前寄り指定
                        </Typography>
                    </Card>
                </Box>

                {/* Seats */}
                <Box className="seats-container" display="flex" flexDirection="column" sx={{ "flex": "1", "gap": 2 }}>

                    {/* Seat Grid */}
                    <Card className="seats" variant="outlined" sx={{
                        "flex": 1,
                        "display": "flex",
                        "p": 2,
                        "overflow": "hidden"
                    }}>
                        {viewFrontTable && (
                            <Card className="seat front-table" sx={{ "width": "50%", "margin": "0 auto" }} variant="soft">
                                <CardContent>
                                    <Typography className="seat-name" textAlign="center">
                                        教卓
                                    </Typography>
                                </CardContent>
                            </Card>
                        )}
                        <Skeleton loading={!seatRows || !seatColumns} animation="wave" sx={{ "flex": 1, "margin": -2 }}>
                            <Box className="seats-row-container" display="flex" flexDirection="column" sx={{ "gap": 2, "flex": 1 }}>
                                {Array.from({ "length": row + row / rowsSpacer - 1 }).map((_, rowIndex) => (
                                    <Box className="seats-column-container" key={rowIndex} display="flex" flexDirection="row" sx={{ "gap": 2, "flexGrow": rowIndex % (rowsSpacer + 1) === rowsSpacer ? 0 : 1 }}>
                                        {Array.from({ "length": column + column / columnsSpacer - 1 }).map((_, colIndex) => (
                                            (rowIndex % (rowsSpacer + 1) === rowsSpacer || colIndex % (columnsSpacer + 1) === columnsSpacer) ? (
                                                <Box className="seat-spacer" key={`${rowIndex}-${colIndex}`} sx={{ "minWidth": "1rem", "minHeight": "1rem" }} />
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
                                                    <Card
                                                        className={`seat ${disabledSeats?.get(`${realRow}-${realCol}`) ? "disabled" : ""}`}
                                                        key={`${rowIndex}-${colIndex}`}
                                                        sx={{ "flex": 1, "height": "100%", "opacity": disabledSeats?.get(`${realRow}-${realCol}`) ? 0.25 : 1, "transition": "background 0.2s, opacity 0.2s", "userSelect": "none" }}
                                                        id={`seat-${realRow}-${realCol}`}
                                                        variant="soft"
                                                        color={frontSelect && seatFrontThreshold && realRow <= seatFrontThreshold ? "primary" : "neutral"}
                                                        onClick={() => {
                                                            if (disabledSeats?.has(`${realRow}-${realCol}`) && disabledSeats.get(`${realRow}-${realCol}`)) {
                                                                setDisabledSeats(new Map(disabledSeats).set(`${realRow}-${realCol}`, false));
                                                            } else {
                                                                setDisabledSeats(new Map(disabledSeats).set(`${realRow}-${realCol}`, true));
                                                            }
                                                        }}>
                                                        <CardContent sx={{ "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                                                            <Typography level="h1" className="seat-number">
                                                                {(() => {
                                                                    const seatNumber = seats?.get(`${realRow}-${realCol}`);
                                                                    return seatNumber ? seatNumber : (<>&nbsp;</>);
                                                                })()}
                                                            </Typography>
                                                            <Typography level="body-lg" sx={{ "textAlign": "center", "display": "none" }} className="seat-name">
                                                                {(() => {
                                                                    const seatMember = members?.get(seats?.get(`${realRow}-${realCol}`) || 0);
                                                                    return seatMember ? (
                                                                        <>
                                                                            <Typography className="seat-name-pronouns" component="span" level="body-sm">
                                                                                {seatMember.pronouns}
                                                                            </Typography>
                                                                            <br />
                                                                            {seatMember.name}
                                                                        </>
                                                                    ) : null;
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
