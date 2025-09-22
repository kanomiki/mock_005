/*
 * 製品契約情報API
 * 
 * 仕様:
 * 1. 満期終了から18カ月以内: 契約リストあり + 未来の再契約可能期限
 * 2. 満期終了から18カ月以降: 契約リストなし + 過去の再契約可能期限
 * 3. 契約状態に関係なく、現在利用可能な最新の契約プランを返却
 *    例) 「基本契約A＋オプション契約X」に契約済みでも、
 *        現在「基本契約A＋オプション契約X/Y」が利用可能であれば、
 *        「基本契約A＋オプション契約X/Y」を契約リストとして返却
 */

export const handler = async (event) => {
    // 共通のCORSヘッダー
    const corsHeaders = {
        "Content-Type": "application/json",
    };

    // 共通のレスポンス関数
    const createResponse = (body) => ({
        headers: corsHeaders,
        body: JSON.stringify(body)
    });

    // リクエストボディの解析
    let parsedBody;
    try {
        if (typeof event.body === 'string') {
            parsedBody = JSON.parse(event.body);
        } else {
            parsedBody = event.body;
        }
    } catch (parseError) {
        return createResponse({
            resultCode: 400,
            message: "Invalid JSON format"
        });
    }

    try {
        let responseBody = {};
        
        if (parsedBody.clientSystemCode === 'MCLS') {
            responseBody = processMCLSDevices(parsedBody);
        } else if (parsedBody.clientSystemCode === 'MELく～るLINKシステム') {
            responseBody = processMELDevices(parsedBody);
        } else {
            return createResponse({
                resultCode: 400,
                message: "必須項目の[システム識別子]が設定されていません"
            });
        }

        return createResponse(responseBody);

    } catch (err) {
        const errorMsg = err.message || String(err);
        return createResponse({
            resultCode: 500,
            message: "Internal Server Error",
            error: errorMsg
        });
    }
};

// MCLS デバイス処理関数
function processMCLSDevices(parsedBody) {
    const sampleDevices = [
        {
            // 満期終了から18カ月以内のデバイス（再契約可能）
            // 例：現在「基本契約A＋オプション契約X」に契約済みでも、
            //     最新状態として「基本契約A＋オプション契約X/Y」が利用可能であれば、
            //     「基本契約A＋オプション契約X/Y」を契約リストとして返却
            deviceId: "AC-UNIT-01_SN-2025A",
            deviceStatus: "OK",
            contractList: [
                {
                    contractTypeId: "BASIC-PLAN-2025_A1",
                    optionContractList: [
                        { optionContractId: "OPTION-Basic-REMOTE-CTRL_2025A" },
                        { optionContractId: "OPTION-Basic-ENERGY-SAVE_2025A" },
                        { optionContractId: "OPTION-Basic-NEW-FEATURE_2025A" } // 最新追加オプション
                    ]
                },
                {
                    contractTypeId: "PLUS-PLAN-2025_A2",
                    optionContractList: [
                        { optionContractId: "OPTION-Plus-REMOTE-CTRL_2025A" },
                        { optionContractId: "OPTION-Plus-ENERGY-SAVE_2025A" },
                        { optionContractId: "OPTION-Plus-AI-CONTROL_2025A" } // 最新追加オプション
                    ]
                },
                {
                    contractTypeId: "PREMIUM-PLAN-2025_A3",
                    optionContractList: [
                        { optionContractId: "OPTION-Premium-REMOTE-CTRL_2025A" },
                        { optionContractId: "OPTION-Premium-ENERGY-SAVE_2025A" },
                        { optionContractId: "OPTION-Premium-AI-CONTROL_2025A" }, // 最新追加オプション
                        { optionContractId: "OPTION-Premium-24H-SUPPORT_2025A" } // 最新追加オプション
                    ]
                }
            ],
            warningInfo: "",
            extendMcls: { reContractExpire: "2026-12-31", deviceMemo: "MCLSメモ1 - 再契約可能期限内（最新契約プラン対応）" }
        },
        {
            // 満期終了から18カ月以内のデバイス（再契約可能）
            // 現在契約中のオプションに加えて、新しく利用可能になったオプションも含める
            deviceId: "AC-UNIT-02_SN-2025B",
            deviceStatus: "OK",
            contractList: [
                {
                    contractTypeId: "BASIC-PLAN-2025_B1",
                    optionContractList: [
                        { optionContractId: "OPTION-Basic-REMOTE-CTRL_2025B" }, // 既存契約
                        { optionContractId: "OPTION-Basic-ENERGY-SAVE_2025B" }, // 新規利用可能
                        { optionContractId: "OPTION-Basic-SCHEDULE_2025B" }     // 新規利用可能
                    ]
                },
                {
                    contractTypeId: "PLUS-PLAN-2025_B2", // 新しく利用可能になったプラン
                    optionContractList: [
                        { optionContractId: "OPTION-Plus-ALL-IN-ONE_2025B" }
                    ]
                }
            ],
            warningInfo: "",
            extendMcls: { reContractExpire: "2026-06-15", deviceMemo: "MCLSメモ2 - 再契約可能期限内（契約プラン拡張対応）" }
        },
        {
            // 満期終了から18カ月以降のデバイス（再契約期限切れ）
            deviceId: "HEATPUMP-01_SN-HP2025",
            deviceStatus: "OK",
            contractList: [], // 契約リストは未設定
            warningInfo: "再契約可能期限を過ぎています",
            extendMcls: { reContractExpire: "2024-01-01", deviceMemo: "MCLSメモ3 - 再契約期限切れ" }
        },
        {
            // 満期終了から18カ月以内のデバイス（再契約可能）
            // 例：現在「PREMIUM-PLAN基本のみ」契約でも、最新では「PREMIUM + 追加オプション」が利用可能
            deviceId: "SOLAR-CTRL-01_SN-SC2025",
            deviceStatus: "OK",
            contractList: [
                {
                    contractTypeId: "PREMIUM-PLAN-2025_D1",
                    optionContractList: [
                        { optionContractId: "OPTION-Premium-24H-SUPPORT_2025D1" }, // 既存契約
                        { optionContractId: "OPTION-Premium-REMOTE-CTRL_2025D1" }, // 既存契約
                        { optionContractId: "OPTION-Premium-AI-ANALYTICS_2025D1" }, // 新規利用可能
                        { optionContractId: "OPTION-Premium-PREDICTIVE-MAINT_2025D1" } // 新規利用可能
                    ]
                },
                {
                    contractTypeId: "ULTRA-PREMIUM-PLAN-2025_D2", // 新しく利用可能になった上位プラン
                    optionContractList: [
                        { optionContractId: "OPTION-Ultra-ALL-INCLUSIVE_2025D2" },
                        { optionContractId: "OPTION-Ultra-ENTERPRISE-SUPPORT_2025D2" }
                    ]
                }
            ],
            warningInfo: "",
            extendMcls: { reContractExpire: "2026-11-20", deviceMemo: "MCLSメモ4 - 再契約可能期限内（最新プラン対応）" }
        },
        {
            // 満期終了から18カ月以降のデバイス（再契約期限切れ）
            deviceId: "BATTERY-01_SN-BT2025",
            deviceStatus: "OK",
            contractList: [], // 契約リストは未設定
            warningInfo: "再契約可能期限を過ぎています",
            extendMcls: { reContractExpire: "2023-12-31", deviceMemo: "MCLSメモ5 - 再契約期限切れ" }
        }
    ];

    return processDeviceList(parsedBody, sampleDevices);
}

// MEL デバイス処理関数
function processMELDevices(parsedBody) {
    const sampleDevices = [
        {
            // 満期終了から18カ月以内のデバイス（再契約可能）
            // 例：現在「MEL-PLAN-A1 + REMOTE」契約でも、最新では「MEL-PLAN-A1 + REMOTE/ENERGY/AI」が利用可能
            deviceId: "mel001",
            deviceStatus: "OK",
            contractList: [
                {
                    contractTypeId: "MEL-PLAN-A1",
                    optionContractList: [
                        { optionContractId: "MEL-OPT-A1-REMOTE" },     // 既存契約
                        { optionContractId: "MEL-OPT-A1-ENERGY" },     // 既存契約
                        { optionContractId: "MEL-OPT-A1-AI-CONTROL" }, // 新規利用可能
                        { optionContractId: "MEL-OPT-A1-ANALYTICS" }   // 新規利用可能
                    ]
                },
                {
                    contractTypeId: "MEL-PLAN-A2-ENHANCED", // 新しく利用可能になったプラン
                    optionContractList: [
                        { optionContractId: "MEL-OPT-A2-ALL-IN-ONE" },
                        { optionContractId: "MEL-OPT-A2-PREMIUM-SUPPORT" }
                    ]
                }
            ],
            warningInfo: "",
            extendMcls: { reContractExpire: "2026-03-31", deviceMemo: "MELく～るメモ1 - 再契約可能期限内（最新契約対応）" }
        },
        {
            // 満期終了から18カ月以降のデバイス（再契約期限切れ）
            deviceId: "mel002",
            deviceStatus: "OK",
            contractList: [], // 契約リストは未設定
            warningInfo: "再契約可能期限を過ぎています",
            extendMcls: { reContractExpire: "2024-02-15", deviceMemo: "MELく～るメモ2 - 再契約期限切れ" }
        },
        {
            // 満期終了から18カ月以内のデバイス（再契約可能）
            // 例：現在「MEL-PLAN-B1基本のみ」契約でも、最新では「MEL-PLAN-B1 + 拡張オプション」が利用可能
            deviceId: "mel003",
            deviceStatus: "OK",
            contractList: [
                {
                    contractTypeId: "MEL-PLAN-B1",
                    optionContractList: [
                        { optionContractId: "MEL-OPT-B1-REMOTE" },        // 既存利用可能
                        { optionContractId: "MEL-OPT-B1-ENERGY" },        // 既存利用可能
                        { optionContractId: "MEL-OPT-B1-SUPPORT" },       // 既存利用可能
                        { optionContractId: "MEL-OPT-B1-SMART-SCHEDULE" }, // 新規利用可能
                        { optionContractId: "MEL-OPT-B1-PREDICTIVE" }     // 新規利用可能
                    ]
                },
                {
                    contractTypeId: "MEL-PLAN-B1-PLUS", // アップグレードされた新プラン
                    optionContractList: [
                        { optionContractId: "MEL-OPT-B1-PLUS-COMPREHENSIVE" },
                        { optionContractId: "MEL-OPT-B1-PLUS-ENTERPRISE" }
                    ]
                }
            ],
            warningInfo: "",
            extendMcls: { reContractExpire: "2026-08-10", deviceMemo: "MELく～るメモ3 - 再契約可能期限内（契約プラン拡張）" }
        }
    ];

    return processDeviceList(parsedBody, sampleDevices);
}

// 共通のデバイスリスト処理関数
function processDeviceList(parsedBody, sampleDevices) {
    const reqDeviceList = Array.isArray(parsedBody.deviceList) ? parsedBody.deviceList : [];
    
    // リクエストされた各デバイスについて処理
    const responseDeviceList = reqDeviceList.map(reqDev => {
        const found = sampleDevices.find(s => s.deviceId === reqDev.deviceId);
        
        if (found) {
            // 機器が見つかった場合：OK状態で契約情報を返却
            return {
                deviceId: found.deviceId,
                deviceStatus: found.deviceStatus, // サンプルデータのステータス（通常は"OK"）
                contractList: found.contractList,
                warningInfo: found.warningInfo,
                extendMcls: found.extendMcls
            };
        } else {
            // 機器が見つからない場合：NG状態で空の契約情報を返却
            return {
                deviceId: reqDev.deviceId,
                deviceStatus: "NG",
                contractList: [],
                warningInfo: "デバイスが見つかりません",
                extendMcls: {}
            };
        }
    });

    // 少なくとも1件のOK機器がある場合のみdeviceListを設定
    const okDevices = responseDeviceList.filter(device => device.deviceStatus === "OK" && device.contractList.length > 0);
    
    if (okDevices.length > 0) {
        // 1件以上のOK機器がある場合：全ての機器情報（OK/NG混合）を返却
        return {
            resultCode: 200,
            deviceList: responseDeviceList
        };
    } else {
        // OK機器が1件もない場合：deviceList項目自体を設定しない
        return {
            resultCode: 400,
            message: "利用可能な機器情報が見つかりませんでした"
        };
    }
}