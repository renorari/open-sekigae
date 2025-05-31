"use client";

import "../styles/main.css";

import React, { useEffect, useState } from "react";

import {
    DataArrayRounded, IosShareRounded, KeyboardArrowLeft, KeyboardArrowRight, PersonRounded,
    PrintRounded, SettingsRounded
} from "@mui/icons-material";
import {
    Avatar, Badge, Box, Button, ButtonGroup, Card, CardActions, CardContent, FormControl, FormLabel,
    IconButton, Input, List, ListItem, Modal, ModalClose, ModalDialog, Sheet, Skeleton, Snackbar,
    Textarea, Typography
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
    const [disabledSeats, setDisabledSeats] = useState<Map<string, boolean> | null>(null);
    const [seats, setSeats] = useState<Map<string, number> | null>(null);
    const [next, setNext] = useState<number | null>(null);
    const [members, setMembers] = useState<Map<number, Member> | null>(null);

    const [autoLottery, setAutoLottery] = useState<boolean>(false);
    const [frontSelect, setFrontSelect] = useState<boolean>(false);
    const [turn, setTurn] = useState<boolean>(false);
    const [viewFrontTable, setViewFrontTable] = useState<boolean>(true);
    const [autoLotteryInterval, setAutoLotteryInterval] = useState<number>(1000);
    const [animationSteps, setAnimationSteps] = useState<number>(10);
    const [animationTime, setAnimationTime] = useState<number>(1000);
    const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

    const [seatSettingModalOpen, setSeatSettingModalOpen] = useState<boolean>(false);
    const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
    const [membersModalOpen, setMembersModalOpen] = useState<boolean>(false);
    const [membersInput, setMembersInput] = useState<string>("");
    const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const [rollAudio, setRollAudio] = useState<HTMLAudioElement | null>(null);
    const [rollCloseAudio, setRollCloseAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        // 音声のロード
        setRollAudio(new Audio("/sounds/roll.mp3"));
        setRollCloseAudio(new Audio("/sounds/roll-close.mp3"));

        // ローカルストレージから設定を読み込む
        const settings = localStorage.getItem("settings");
        const parsedSettings = JSON.parse(settings || "{}");
        setSeatRows(parsedSettings.seatRows || 6);
        setSeatColumns(parsedSettings.seatColumns || 6);
        setSeatRowsSpacer(parsedSettings.seatRowsSpacer || 0);
        setSeatColumnsSpacer(parsedSettings.seatColumnsSpacer || 2);
        setSeatFrontThreshold(parsedSettings.seatFrontThreshold || 2);
        setDisabledSeats(new Map(parsedSettings.disabledSeats || []));
        setSeats(new Map(parsedSettings.seats || []));
        setMembers(new Map(parsedSettings.members || []));
        setTurn(parsedSettings.turn || false);
        setViewFrontTable(parsedSettings.viewFrontTable || true);
        setAutoLotteryInterval(parsedSettings.autoLotteryInterval || 1000);
        setAnimationSteps(parsedSettings.animationSteps || 10);
        setAnimationTime(parsedSettings.animationTime || 1000);
        setAudioEnabled(parsedSettings.audioEnabled || true);
    }, []);

    useEffect(() => {
        // 設定の保存
        const settings = {
            seatRows,
            seatColumns,
            seatRowsSpacer,
            seatColumnsSpacer,
            seatFrontThreshold,
            "disabledSeats": Array.from(disabledSeats || []),
            "seats": Array.from(seats || []),
            "members": Array.from(members || []),
            turn,
            viewFrontTable,
            autoLotteryInterval,
            animationSteps,
            animationTime,
            audioEnabled
        };
        localStorage.setItem("settings", JSON.stringify(settings));

        // メンバー設定
        setMembersInput(Array.from(members || []).map(([_, member]) => `${member.name}, ${member.pronouns}`).join("\n"));

        // 次の人の設定
        setNext(!members || members.size === 0 ? null : (next ? next : 1));
    }, [
        seatRows, seatColumns, seatRowsSpacer, seatColumnsSpacer, seatFrontThreshold,
        disabledSeats, seats, members, turn, viewFrontTable,
        autoLotteryInterval, animationSteps, animationTime, audioEnabled
    ]);

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
            setSnackbarMessage("空いている座席がありません。");
            setSnackbarOpen(true);
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
        if (audioEnabled) rollAudio?.play().catch(() => { });
        let animationStep = 0;
        const animateStep = () => {
            if (animationStep < animationSteps) {
                // アニメーション中はランダムな座席を表示
                const randomSeat = availableSeats[Math.floor(Math.random() * availableSeats.length)] as string;
                setSeats(new Map(originalSeats).set(randomSeat, number));
                animationStep++;
                setTimeout(animateStep, animationTime / animationSteps);
            } else {
                // アニメーション完了後、最終的な座席を設定
                if (audioEnabled) {
                    rollAudio?.pause();
                    if (rollAudio) rollAudio.currentTime = 0;
                    if (rollCloseAudio) rollCloseAudio.currentTime = 0;
                    rollCloseAudio?.play().catch(() => { });
                }
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
                <Typography level="h1" sx={{ "flex": 1, "fontSize": "1.5rem" }}>
                    <img src="/images/logo.svg" alt="Open Sékigae" style={{ "height": "1em", "verticalAlign": "middle" }} />
                </Typography>
                <Box display="flex" sx={{ "gap": 1 }}>
                    <Badge badgeContent={members?.size} max={99} badgeInset="14%" size="sm">
                        <IconButton style={{ "borderRadius": "100vw" }} aria-label="Members" onClick={() => setMembersModalOpen(true)}>
                            <PersonRounded color="primary" />
                        </IconButton>
                    </Badge>
                    <IconButton style={{ "borderRadius": "100vw" }} aria-label="Export" onClick={() => setExportModalOpen(true)}>
                        <IosShareRounded color="primary" />
                    </IconButton>
                    <IconButton style={{ "borderRadius": "100vw" }} aria-label="Settings" onClick={() => setSettingsModalOpen(true)}>
                        <SettingsRounded color="primary" />
                    </IconButton>
                </Box>
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
                                    <Box display="flex" flexDirection="column" sx={{ "flex": 1 }}>
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
                                        <Box display="flex" flexDirection="column" sx={{ "flex": 1 }}>
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
                        <List className="members-list" sx={{ "height": "0px", "overflowY": "scroll", "flex": 1 }}>
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
                        "flexDirection": !turn ? "column" : "column-reverse",
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
                            <Box className="seats-row-container" display="flex" flexDirection={!turn ? "column" : "column-reverse"} sx={{ "gap": 2, "flex": 1 }}>
                                {Array.from({ "length": row + row / rowsSpacer - 1 }).map((_, rowIndex) => (
                                    <Box className="seats-column-container" key={rowIndex} display="flex" flexDirection={!turn ? "row" : "row-reverse"} sx={{ "gap": 2, "flex": rowIndex % (rowsSpacer + 1) === rowsSpacer ? 0 : 1 }}>
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

            {/* Members Modal */}
            <Modal open={membersModalOpen} onClose={() => setMembersModalOpen(false)} className="modal">
                <ModalDialog>
                    <ModalClose />
                    <Typography level="title-lg">
                        メンバー設定
                    </Typography>

                    メンバーの名前と読み方を設定します。<br />
                    <br />
                    番号は自動的に上から1, 2, 3...と割り当てられます。<br />
                    以下のように、名前と読み方を入力してください。
                    <Card variant="soft" sx={{ "gap": 0 }}>
                        <Typography level="body-sm">
                            例:
                        </Typography>
                        山田太郎, やまだたろう
                        <br />
                        鈴木花子, すずきはなこ
                    </Card>

                    <Box display="flex" flexDirection="column" sx={{ "gap": 2, "overflowY": "auto" }}>
                        <Textarea
                            minRows={10}
                            value={membersInput}
                            onChange={(e) => setMembersInput(e.target.value)}
                            placeholder="メンバーの名前と読み方を入力してください。"
                            endDecorator={
                                <Typography level="body-xs" sx={{ "ml": "auto" }}>
                                    {membersInput.trim().length > 0 ? membersInput.trim().split("\n").length : 0}行
                                </Typography>
                            }
                        />
                    </Box>

                    <Button variant="solid" onClick={() => {
                        const newMembers = new Map<number, Member>();
                        membersInput.trim().split("\n").forEach((line, index) => {
                            const [name, pronouns] = line.split(",").map(part => part.trim());
                            if (name && pronouns) {
                                newMembers.set(index + 1, { name, pronouns });
                            }
                        });
                        setMembers(newMembers);

                        setMembersModalOpen(false);
                    }}>
                        閉じる
                    </Button>
                </ModalDialog>
            </Modal>

            {/* Settings Modal */}
            <Modal open={settingsModalOpen} onClose={() => setSettingsModalOpen(false)} className="modal">
                <ModalDialog>
                    <ModalClose />
                    <Typography level="title-lg">
                        設定
                    </Typography>

                    <Box display="flex" flexDirection="column" sx={{ "gap": 2, "overflowY": "auto" }}>
                        <Typography level="title-md" sx={{ "mb": -2 }}>
                            一般設定
                        </Typography>
                        <Box>
                            <Typography component="label" startDecorator={<AnimeSwitch checked={turn} onChange={() => setTurn(!turn)} />}>
                                座席を反転表示
                            </Typography>
                            <Typography component="label" startDecorator={<AnimeSwitch checked={viewFrontTable} onChange={() => setViewFrontTable(!viewFrontTable)} />}>
                                教卓を表示
                            </Typography>
                            <Typography component="label" startDecorator={<AnimeSwitch checked={audioEnabled} onChange={() => setAudioEnabled(!audioEnabled)} />}>
                                音声を有効にする
                            </Typography>
                        </Box>

                        <Typography level="title-md" sx={{ "mb": -2 }}>
                            座席の設定
                        </Typography>

                        <Box display="flex" flexDirection="row" sx={{ "gap": 2, "alignItems": "center" }}>
                            <FormControl sx={{ "flex": 1 }}>
                                <FormLabel>座席行数</FormLabel>
                                <Input
                                    type="number"
                                    value={seatRows || 6}
                                    onChange={(e) => setSeatRows(Number(e.target.value))}
                                    placeholder="行数を入力"
                                    slotProps={{ "input": { "min": 1, "max": 20 } }}
                                />
                            </FormControl>
                            <FormControl sx={{ "flex": 1 }}>
                                <FormLabel>座席列数</FormLabel>
                                <Input
                                    type="number"
                                    value={seatColumns || 6}
                                    onChange={(e) => setSeatColumns(Number(e.target.value))}
                                    placeholder="列数を入力"
                                    slotProps={{ "input": { "min": 1, "max": 20 } }}
                                />
                            </FormControl>
                        </Box>
                        <Box display="flex" flexDirection="row" sx={{ "gap": 2, "alignItems": "center" }}>
                            <FormControl sx={{ "flex": 1 }}>
                                <FormLabel>座席行グループ</FormLabel>
                                <Input
                                    type="number"
                                    value={seatRowsSpacer || 0}
                                    onChange={(e) => setSeatRowsSpacer(Number(e.target.value))}
                                    placeholder="行間隔を入力"
                                    slotProps={{ "input": { "min": 0, "max": 10 } }}
                                />
                            </FormControl>
                            <FormControl sx={{ "flex": 1 }}>
                                <FormLabel>座席列グループ</FormLabel>
                                <Input
                                    type="number"
                                    value={seatColumnsSpacer || 2}
                                    onChange={(e) => setSeatColumnsSpacer(Number(e.target.value))}
                                    placeholder="列間隔を入力"
                                    slotProps={{ "input": { "min": 0, "max": 10 } }}
                                />
                            </FormControl>
                        </Box>

                        <FormControl>
                            <FormLabel>前寄り指定行数</FormLabel>
                            <Input
                                type="number"
                                value={seatFrontThreshold || 2}
                                onChange={(e) => setSeatFrontThreshold(e.target.value ? Number(e.target.value) : null)}
                                placeholder="前寄り指定の行数を入力"
                                slotProps={{ "input": { "min": 0, "max": row } }}
                            />
                        </FormControl>

                        <Typography level="title-md" sx={{ "mb": -2 }}>
                            抽選の設定
                        </Typography>

                        <FormControl>
                            <FormLabel>自動抽選間隔</FormLabel>
                            <Input
                                type="number"
                                value={autoLotteryInterval}
                                onChange={(e) => setAutoLotteryInterval(Number(e.target.value))}
                                placeholder="自動抽選の間隔をミリ秒で入力"
                                slotProps={{ "input": { "min": 100, "max": 10000 } }}
                            />
                        </FormControl>

                        <Typography level="title-sm" sx={{ "mb": -2 }}>
                            アニメーション
                        </Typography>

                        <Box display="flex" flexDirection="row" sx={{ "gap": 2, "alignItems": "center" }}>
                            <FormControl sx={{ "flex": 1 }}>
                                <FormLabel>時間</FormLabel>
                                <Input
                                    type="number"
                                    value={animationTime}
                                    onChange={(e) => setAnimationTime(Number(e.target.value))}
                                    placeholder="アニメーションの時間をミリ秒で入力"
                                    slotProps={{ "input": { "min": 100, "max": 5000 } }}
                                />
                            </FormControl>
                            <FormControl sx={{ "flex": 1 }}>
                                <FormLabel>ステップ数</FormLabel>
                                <Input
                                    type="number"
                                    value={animationSteps}
                                    onChange={(e) => setAnimationSteps(Number(e.target.value))}
                                    placeholder="アニメーションのステップ数を入力"
                                    slotProps={{ "input": { "min": 0, "max": 10 } }}
                                />
                            </FormControl>
                        </Box>

                        <Typography level="title-sm" sx={{ "mb": -2 }}>
                            リセット
                        </Typography>

                        <Box display="flex" flexDirection="row" sx={{ "gap": 2, "alignItems": "center" }}>
                            <Button
                                variant="outlined"
                                color="danger"
                                onClick={() => {
                                    if (confirm("座席をリセットしますか？")) {
                                        setSeats(new Map());
                                    }
                                }}
                                sx={{ "flex": 1 }}>
                                座席
                            </Button>
                            <Button
                                variant="outlined"
                                color="danger"
                                onClick={() => {
                                    if (confirm("すべての設定をリセットしますか？") && confirm("本当にすべての設定をリセットしますか？")) {
                                        localStorage.removeItem("settings");
                                        location.reload();
                                    }
                                }}
                                sx={{ "flex": 1 }}>
                                すべての設定
                            </Button>
                        </Box>
                    </Box>

                    <Button variant="solid" onClick={() => setSettingsModalOpen(false)}>
                        閉じる
                    </Button>
                </ModalDialog>
            </Modal>

            {/* Export Modal */}
            <Modal open={exportModalOpen} onClose={() => setExportModalOpen(false)} className="modal">
                <ModalDialog>
                    <ModalClose />
                    <Typography level="title-lg">
                        座席のエクスポート
                    </Typography>

                    <Box display="flex" flexDirection="row" sx={{ "gap": 2, "alignItems": "center" }}>
                        <Button
                            onClick={() => {
                                setExportModalOpen(false);
                                const csvContent = [];
                                csvContent.push("教卓,,,,,");
                                for (let r = 1; r <= row; r++) {
                                    const rowData = [];
                                    for (let c = 1; c <= column; c++) {
                                        const seatNumber = `${r}-${c}`;
                                        const memberId = seats?.get(seatNumber);
                                        rowData.push(memberId ? memberId : "");
                                    }
                                    csvContent.push(rowData.join(","));
                                }
                                const csvBlob = new Blob([csvContent.join("\n")], { "type": "text/csv" });
                                const csvUrl = URL.createObjectURL(csvBlob);
                                const link = document.createElement("a");
                                link.href = csvUrl;
                                link.download = "seats.csv";
                                link.click();
                                URL.revokeObjectURL(csvUrl);
                                setSnackbarMessage("CSV形式でエクスポートしました。");
                                setSnackbarOpen(true);
                            }}
                            sx={{ "flex": 1, "flexDirection": "column" }}
                            variant="soft"
                        >
                            <DataArrayRounded sx={{"fontSize": "2rem"}} />
                            CSV形式
                        </Button>
                        <Button
                            onClick={() => {
                                setExportModalOpen(false);
                                window.print();
                            }}
                            sx={{ "flex": 1, "flexDirection": "column" }}
                            variant="soft"
                        >
                            <PrintRounded sx={{"fontSize": "2rem"}} />
                            印刷形式
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                autoHideDuration={3000}>
                {snackbarMessage}
            </Snackbar>
        </Box>
    );
}
