

export const handler = async (event) => {
    // console.log('handler event:', event.body);
    // const parsedBody = JSON.parse(event.body);
    let parsedBody;
    if (typeof event.body === 'string') {
        parsedBody = JSON.parse(event.body);
    } else {
        parsedBody = event.body;
    }
    // console.log('parsedBody:', parsedBody.clientSystemCode);


    try {
        let responseBody = {};
        if (parsedBody.clientSystemCode === 'MCLS') {
            const sampleDevices = [
                {
                    deviceId: "AC-UNIT-01_SN-2025A",
                    deviceStatus: "OK",
                    contractList: [
                        {
                            contractTypeId: "BASIC-PLAN-2025_A1",
                            optionContractList: [
                                { contractTypeId: "OPTION-Basic-REMOTE-CTRL_2025A" },
                                { contractTypeId: "OPTION-Basic-ENERGY-SAVE_2025A" }
                            ]
                        },
                        {
                            contractTypeId: "PLUS-PLAN-2025_A2",
                            optionContractList: [
                                { contractTypeId: "OPTION-Plus-REMOTE-CTRL_2025A" },
                                { contractTypeId: "OPTION-Plus-ENERGY-SAVE_2025A" }
                            ]
                        },
                        {
                            contractTypeId: "PREMIUM-PLAN-2025_A3",
                            optionContractList: [
                                { contractTypeId: "OPTION-Premium-REMOTE-CTRL_2025A" },
                                { contractTypeId: "OPTION-Premium-ENERGY-SAVE_2025A" }
                            ]
                        }
                    ],
                    warningInfo: "",
                    extendMcls: { reContractExpire: "2025-12-31", deviceMemo: "MCLSメモ1" }
                },
                {
                    deviceId: "AC-UNIT-02_SN-2025B",
                    deviceStatus: "NG",
                    contractList: [
                        {
                            contractTypeId: "BASIC-PLAN-2025_B1",
                            optionContractList: [
                                { contractTypeId: "OPTION-Basic-REMOTE-CTRL_2025B" },
                                { contractTypeId: "OPTION-Basic-ENERGY-SAVE_2025B" }
                            ]
                        },
                        {
                            contractTypeId: "PLUS-PLAN-2025_B2",
                            optionContractList: [
                                { contractTypeId: "OPTION-Plus-REMOTE-CTRL_2025B" },
                                { contractTypeId: "OPTION-Plus-ENERGY-SAVE_2025B" }
                            ]
                        },
                        {
                            contractTypeId: "PREMIUM-PLAN-2025_B3",
                            optionContractList: [
                                { contractTypeId: "OPTION-Premium-REMOTE-CTRL_2025B" },
                                { contractTypeId: "OPTION-Premium-ENERGY-SAVE_2025B" }
                            ]
                        }
                    ],
                    warningInfo: "契約エラー",
                    extendMcls: { reContractExpire: "2026-01-15", deviceMemo: "MCLSメモ2" }
                },
                {
                    deviceId: "HEATPUMP-01_SN-HP2025",
                    deviceStatus: "OK",
                    contractList: [
                        {
                            contractTypeId: "ECO-PLAN-2025_C1",
                            optionContractList: [
                                { contractTypeId: "OPTION-Eco-REMOTE-CTRL_2025C" },
                                { contractTypeId: "OPTION-Eco-ENERGY-SAVE_2025C" }
                            ]
                        },
                        {
                            contractTypeId: "ECO-PLAN-2025_C2",
                            optionContractList: [
                                { contractTypeId: "OPTION-Eco-REMOTE-CTRL_2025C2" },
                                { contractTypeId: "OPTION-Eco-ENERGY-SAVE_2025C2" }
                            ]
                        },
                        {
                            contractTypeId: "ECO-PLAN-2025_C3",
                            optionContractList: [
                                { contractTypeId: "OPTION-Eco-REMOTE-CTRL_2025C3" },
                                { contractTypeId: "OPTION-Eco-ENERGY-SAVE_2025C3" }
                            ]
                        }
                    ],
                    warningInfo: "注意！",
                    extendMcls: { reContractExpire: "2025-10-01", deviceMemo: "MCLSメモ3" }
                },
                {
                    deviceId: "SOLAR-CTRL-01_SN-SC2025",
                    deviceStatus: "OK",
                    contractList: [
                        {
                            contractTypeId: "PREMIUM-PLAN-2025_D1",
                            optionContractList: [
                                { contractTypeId: "OPTION-Premium-24H-SUPPORT_2025D1" },
                                { contractTypeId: "OPTION-Premium-REMOTE-CTRL_2025D1" }
                            ]
                        },
                        {
                            contractTypeId: "PREMIUM-PLAN-2025_D2",
                            optionContractList: [
                                { contractTypeId: "OPTION-Premium-24H-SUPPORT_2025D2" },
                                { contractTypeId: "OPTION-Premium-REMOTE-CTRL_2025D2" }
                            ]
                        },
                        {
                            contractTypeId: "PREMIUM-PLAN-2025_D3",
                            optionContractList: [
                                { contractTypeId: "OPTION-Premium-24H-SUPPORT_2025D3" },
                                { contractTypeId: "OPTION-Premium-REMOTE-CTRL_2025D3" }
                            ]
                        }
                    ],
                    warningInfo: "",
                    extendMcls: { reContractExpire: "2025-11-20", deviceMemo: "MCLSメモ4" }
                },
                {
                    deviceId: "BATTERY-01_SN-BT2025",
                    deviceStatus: "NG",
                    contractList: [
                        {
                            contractTypeId: "BASIC-PLAN-2025_E1",
                            optionContractList: [
                                { contractTypeId: "OPTION-Basic-REMOTE-CTRL_2025E" },
                                { contractTypeId: "OPTION-Basic-ENERGY-SAVE_2025E" }
                            ]
                        },
                        {
                            contractTypeId: "PLUS-PLAN-2025_E2",
                            optionContractList: [
                                { contractTypeId: "OPTION-Plus-REMOTE-CTRL_2025E" },
                                { contractTypeId: "OPTION-Plus-ENERGY-SAVE_2025E" }
                            ]
                        },
                        {
                            contractTypeId: "PREMIUM-PLAN-2025_E3",
                            optionContractList: [
                                { contractTypeId: "OPTION-Premium-REMOTE-CTRL_2025E" },
                                { contractTypeId: "OPTION-Premium-ENERGY-SAVE_2025E" }
                            ]
                        }
                    ],
                    warningInfo: "デバイス未契約",
                    extendMcls: { reContractExpire: "2025-09-30", deviceMemo: "MCLSメモ5" }
                }
            ];
            const reqDeviceList = Array.isArray(parsedBody.deviceList) ? parsedBody.deviceList : [];
            const responseDeviceList = reqDeviceList
                .map(reqDev => {
                    const found = sampleDevices.find(s => s.deviceId === reqDev.deviceId);
                    if (found) {
                        if (!found.contractList || found.contractList.length === 0) {
                            return {
                                statusCode: 400,
                                deviceId: found.deviceId,
                                deviceStatus: "NG",
                                contractList: [],
                                warningInfo: found.warningInfo,
                                extendMcls: found.extendMcls
                            };
                        } else {
                            return {
                                statusCode: 200,
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ found })
                            };
                        }
                    } else {
                        return {
                                statusCode: 400,
                                deviceId: found.deviceId,
                                deviceStatus: "NG",
                                contractList: [],
                                warningInfo: found.warningInfo,
                                extendMcls: found.extendMcls
                            };
                    }
                })
                .filter(Boolean);
            if (responseDeviceList.length > 0) {
                responseBody = {
                    statusCode: 200,
                    deviceList: responseDeviceList
                };
            } else {
                // デバイスが見つからなかった場合
                responseBody = {
                    statusCode: 400,
                    deviceList: []
                };
            }
        } else if (parsedBody.clientSystemCode === 'MELく～るLINKシステム') {
            const sampleDevices = [
                {
                    deviceId: "mel001",
                    deviceStatus: "OK",
                    contractList: [
                        {
                            contractTypeId: "MEL-PLAN-A1",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-A1-REMOTE" },
                                { contractTypeId: "MEL-OPT-A1-ENERGY" }
                            ]
                        },
                        {
                            contractTypeId: "MEL-PLAN-A2",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-A2-REMOTE" },
                                { contractTypeId: "MEL-OPT-A2-ENERGY" }
                            ]
                        },
                        {
                            contractTypeId: "MEL-PLAN-A3",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-A3-REMOTE" },
                                { contractTypeId: "MEL-OPT-A3-ENERGY" }
                            ]
                        }
                    ],
                    warningInfo: "",
                    extendMcls: { reContractExpire: "2026-03-31", deviceMemo: "MELく～るメモ1" }
                },
                {
                    deviceId: "mel002",
                    deviceStatus: "NG",
                    contractList: [
                        {
                            contractTypeId: "MEL-PLAN-B1",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-B1-REMOTE" },
                                { contractTypeId: "MEL-OPT-B1-ENERGY" }
                            ]
                        },
                        {
                            contractTypeId: "MEL-PLAN-B2",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-B2-REMOTE" },
                                { contractTypeId: "MEL-OPT-B2-ENERGY" }
                            ]
                        },
                        {
                            contractTypeId: "MEL-PLAN-B3",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-B3-REMOTE" },
                                { contractTypeId: "MEL-OPT-B3-ENERGY" }
                            ]
                        }
                    ],
                    warningInfo: "契約エラー",
                    extendMcls: { reContractExpire: "2026-04-15", deviceMemo: "MELく～るメモ2" }
                },
                {
                    deviceId: "mel003",
                    deviceStatus: "OK",
                    contractList: [
                        {
                            contractTypeId: "MEL-PLAN-C1",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-C1-REMOTE" },
                                { contractTypeId: "MEL-OPT-C1-ENERGY" }
                            ]
                        },
                        {
                            contractTypeId: "MEL-PLAN-C2",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-C2-REMOTE" },
                                { contractTypeId: "MEL-OPT-C2-ENERGY" }
                            ]
                        },
                        {
                            contractTypeId: "MEL-PLAN-C3",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-C3-REMOTE" },
                                { contractTypeId: "MEL-OPT-C3-ENERGY" }
                            ]
                        }
                    ],
                    warningInfo: "注意！",
                    extendMcls: { reContractExpire: "2026-05-01", deviceMemo: "MELく～るメモ3" }
                },
                {
                    deviceId: "mel004",
                    deviceStatus: "OK",
                    contractList: [
                        {
                            contractTypeId: "MEL-PLAN-D1",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-D1-REMOTE" },
                                { contractTypeId: "MEL-OPT-D1-ENERGY" }
                            ]
                        },
                        {
                            contractTypeId: "MEL-PLAN-D2",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-D2-REMOTE" },
                                { contractTypeId: "MEL-OPT-D2-ENERGY" }
                            ]
                        },
                        {
                            contractTypeId: "MEL-PLAN-D3",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-D3-REMOTE" },
                                { contractTypeId: "MEL-OPT-D3-ENERGY" }
                            ]
                        }
                    ],
                    warningInfo: "",
                    extendMcls: { reContractExpire: "2026-06-20", deviceMemo: "MELく～るメモ4" }
                },
                {
                    deviceId: "mel005",
                    deviceStatus: "NG",
                    contractList: [
                        {
                            contractTypeId: "MEL-PLAN-E1",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-E1-REMOTE" },
                                { contractTypeId: "MEL-OPT-E1-ENERGY" }
                            ]
                        },
                        {
                            contractTypeId: "MEL-PLAN-E2",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-E2-REMOTE" },
                                { contractTypeId: "MEL-OPT-E2-ENERGY" }
                            ]
                        },
                        {
                            contractTypeId: "MEL-PLAN-E3",
                            optionContractList: [
                                { contractTypeId: "MEL-OPT-E3-REMOTE" },
                                { contractTypeId: "MEL-OPT-E3-ENERGY" }
                            ]
                        }
                    ],
                    warningInfo: "デバイス未契約",
                    extendMcls: { reContractExpire: "2026-07-30", deviceMemo: "MELく～るメモ5" }
                }
            ];
            const reqDeviceList = Array.isArray(parsedBody.deviceList) ? parsedBody.deviceList : [];
            const responseDeviceList = reqDeviceList
                .map(reqDev => {
                    const found = sampleDevices.find(s => s.deviceId === reqDev.deviceId);
                    if (found) {
                        if (!found.contractList || found.contractList.length === 0) {
                            return {
                                statusCode: 400,
                                headers: { "Content-Type": "application/json" },
                                deviceId: found.deviceId,
                                deviceStatus: "NG",
                                contractList: [],
                                warningInfo: found.warningInfo,
                                extendMcls: found.extendMcls
                            };
                        } else {
                            return {
                                statusCode: 200,
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ found })
                            };
                        }
                    } else {
                        return {
                                statusCode: 400,
                                headers: { "Content-Type": "application/json" },
                                deviceId: found.deviceId,
                                deviceStatus: "NG",
                                contractList: [],
                                warningInfo: found.warningInfo,
                                extendMcls: found.extendMcls
                            };
                    }
                })
                .filter(Boolean);
            if (responseDeviceList.length > 0) {
                responseBody = {
                    statusCode: 200,
                    deviceList: responseDeviceList
                };
            } else {
                // デバイスが見つからなかった場合
                responseBody = {
                    statusCode: 400,
                    deviceList: []
                };
            }
        } else {
            // 4. clientSystemCodeが不明な場合のレスポンス
            responseBody = {
                statusCode: 400,
                message: "必須項目の[システム識別子]が設定されていません"
            };
        }
        const res = {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(responseBody)
        };
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ res })
        };
    } catch (err) {
        // 5. エラーハンドリング
        let errorMsg;
        if (err && typeof err === 'object') {
            if (typeof err.message === 'string') {
                errorMsg = err.message;
            } else {
                errorMsg = JSON.stringify(err);
            }
        } else {
            errorMsg = String(err);
        }
        const res = {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: errorMsg })
        };

        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: res })
        };
    }
}



