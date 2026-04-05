// Auto-generated mission catalog.

export const missionCatalog = {
  "artemis-ii": {
    "trajectory": {
      "missionId": "artemis-ii",
      "frame": "earth-centered-icrf",
      "units": {
        "distance": "km",
        "time": "iso8601"
      },
      "spacecraft": "Orion",
      "missionProfile": {
        "mission": "Artemis II",
        "focus": "Single-mission viewer for the Artemis II crewed lunar flyby.",
        "coverage": {
          "start": "2026-04-01T12:00:00Z",
          "closestApproach": "2026-04-10T12:00:00Z",
          "end": "2026-04-13T12:00:00Z",
          "cadence": "2 h"
        },
        "phases": [
          {
            "id": "earth-departure",
            "label": "Earth departure",
            "description": "Launch through translunar injection and initial outbound shaping.",
            "start": "2026-04-01T12:00:00Z",
            "end": "2026-04-02T18:00:00Z"
          },
          {
            "id": "outbound-coast",
            "label": "Outbound translunar coast",
            "description": "Orion is tracking away from Earth on the way to the lunar flyby.",
            "start": "2026-04-02T18:00:00Z",
            "end": "2026-04-10T12:00:00Z"
          },
          {
            "id": "return-coast",
            "label": "Return coast",
            "description": "Free-return arc back toward Earth after closest approach.",
            "start": "2026-04-10T12:00:00Z",
            "end": "2026-04-12T12:00:00Z"
          },
          {
            "id": "earth-return",
            "label": "Earth return",
            "description": "Final Earth approach and splashdown sequence.",
            "start": "2026-04-12T12:00:00Z",
            "end": "2026-04-13T12:00:00Z"
          }
        ],
        "closestApproachEstimate": {
          "timestamp": "2026-04-11T04:00:00Z",
          "distanceToMoonKm": 47610.951
        }
      },
      "source": {
        "kind": "hybrid-spice-horizons",
        "generatedAt": "2026-04-05T11:36:18.780Z",
        "horizons": {
          "target": "301",
          "center": "500@399",
          "ephemerisType": "VECTORS",
          "stepSize": "2 h",
          "referenceFrame": "ICRF"
        },
        "spice": {
          "manifestMissionId": "artemis-ii",
          "kernelIds": [
            "naif0012",
            "pck00011",
            "de440s",
            "moon_pa_de440_200625",
            "moon_de440_220930"
          ],
          "frame": "J2000 / ICRF-compatible Earth-centered frame",
          "notes": [
            "This manifest is the SPICE-first contract for Artemis II body geometry and frame metadata.",
            "The repo does not commit large kernel binaries yet; it tracks exact upstream NAIF artifacts and URLs for reproducible offline ingestion.",
            "Artemis II spacecraft state vectors are still unavailable here, so the spacecraft path remains a documented hybrid model even though Earth/Moon geometry is aligned to NAIF kernel selection."
          ]
        },
        "fidelity": {
          "earthMoonGeometry": "SPICE-oriented kernel manifest with Horizons-sampled Moon vectors in an Earth-centered ICRF-compatible frame.",
          "spacecraftEphemeris": "Modeled Artemis II / Orion proxy path shaped against the Artemis II free-return timeline because public mission spacecraft SPK coverage is not bundled here.",
          "viewerScene": "Moon motion, Earth-Moon range, event targeting, and closest-approach context now follow the sampled dataset, but body rendering remains stylized rather than attitude-true."
        },
        "approximationNotes": [
          "Orion state vectors are still a mission-shaped proxy rather than released Artemis II spacecraft ephemeris.",
          "Latest mode snaps wall clock time to the nearest generated sample, so it is cadence-limited rather than telemetry-live.",
          "Attitude, lighting, re-entry dynamics, and communications geometry are explanatory visualization layers, not flight dynamics products."
        ],
        "description": "Moon geometry follows a SPICE-first kernel selection and is sampled offline through a reproducible Horizons bridge. Orion trajectory remains an Artemis II-only proxy shaped from the crewed free-return timeline because public spacecraft state vectors are not bundled here."
      },
      "bodyCenters": {
        "earth": [
          0,
          0,
          0
        ],
        "moon": [
          -390066.796,
          -21856.015,
          -26525.365
        ]
      },
      "samples": [
        {
          "timestamp": "2026-04-01T12:00:00Z",
          "positionKm": [
            -13170.274,
            -737.95,
            -895.606
          ],
          "moonPositionKm": [
            -390066.796,
            -21856.015,
            -26525.365
          ]
        },
        {
          "timestamp": "2026-04-01T14:00:00Z",
          "positionKm": [
            -13152.951,
            -953.291,
            -1010.999
          ],
          "moonPositionKm": [
            -389694.386,
            -28250.673,
            -29949.161
          ]
        },
        {
          "timestamp": "2026-04-01T16:00:00Z",
          "positionKm": [
            -13131.175,
            -1166.81,
            -1126.902
          ],
          "moonPositionKm": [
            -389188.063,
            -34635.892,
            -33362.675
          ]
        },
        {
          "timestamp": "2026-04-01T18:00:00Z",
          "positionKm": [
            -13105.064,
            -1377.085,
            -1244.212
          ],
          "moonPositionKm": [
            -388548.302,
            -41009.468,
            -36764.74
          ]
        },
        {
          "timestamp": "2026-04-01T20:00:00Z",
          "positionKm": [
            -13074.794,
            -1582.696,
            -1363.824
          ],
          "moonPositionKm": [
            -387775.623,
            -47369.214,
            -40154.2
          ]
        },
        {
          "timestamp": "2026-04-01T22:00:00Z",
          "positionKm": [
            -13040.6,
            -1782.226,
            -1486.629
          ],
          "moonPositionKm": [
            -386870.589,
            -53712.953,
            -43529.905
          ]
        },
        {
          "timestamp": "2026-04-02T00:00:00Z",
          "positionKm": [
            -13002.776,
            -1974.261,
            -1613.513
          ],
          "moonPositionKm": [
            -385833.807,
            -60038.527,
            -46890.717
          ]
        },
        {
          "timestamp": "2026-04-02T02:00:00Z",
          "positionKm": [
            -12961.679,
            -2157.393,
            -1745.359
          ],
          "moonPositionKm": [
            -384665.923,
            -66343.79,
            -50235.508
          ]
        },
        {
          "timestamp": "2026-04-02T04:00:00Z",
          "positionKm": [
            -12917.727,
            -2330.221,
            -1883.041
          ],
          "moonPositionKm": [
            -383367.626,
            -72626.614,
            -53563.159
          ]
        },
        {
          "timestamp": "2026-04-02T06:00:00Z",
          "positionKm": [
            -12871.404,
            -2491.351,
            -2027.431
          ],
          "moonPositionKm": [
            -381939.648,
            -78884.887,
            -56872.562
          ]
        },
        {
          "timestamp": "2026-04-02T08:00:00Z",
          "positionKm": [
            -12823.262,
            -2639.402,
            -2179.392
          ],
          "moonPositionKm": [
            -380382.758,
            -85116.515,
            -60162.621
          ]
        },
        {
          "timestamp": "2026-04-02T10:00:00Z",
          "positionKm": [
            -12773.926,
            -2773.008,
            -2339.784
          ],
          "moonPositionKm": [
            -378697.766,
            -91319.419,
            -63432.248
          ]
        },
        {
          "timestamp": "2026-04-02T12:00:00Z",
          "positionKm": [
            -12724.102,
            -2890.818,
            -2509.46
          ],
          "moonPositionKm": [
            -376885.521,
            -97491.542,
            -66680.371
          ]
        },
        {
          "timestamp": "2026-04-02T14:00:00Z",
          "positionKm": [
            -12674.585,
            -2991.508,
            -2689.27
          ],
          "moonPositionKm": [
            -374946.911,
            -103630.844,
            -69905.926
          ]
        },
        {
          "timestamp": "2026-04-02T16:00:00Z",
          "positionKm": [
            -12626.272,
            -3073.783,
            -2880.062
          ],
          "moonPositionKm": [
            -372882.861,
            -109735.303,
            -73107.863
          ]
        },
        {
          "timestamp": "2026-04-02T18:00:00Z",
          "positionKm": [
            -12580.177,
            -3136.393,
            -3082.687
          ],
          "moonPositionKm": [
            -370694.333,
            -115802.919,
            -76285.141
          ]
        },
        {
          "timestamp": "2026-04-02T20:00:00Z",
          "positionKm": [
            -12537.458,
            -3178.143,
            -3298.003
          ],
          "moonPositionKm": [
            -368382.326,
            -121831.712,
            -79436.736
          ]
        },
        {
          "timestamp": "2026-04-02T22:00:00Z",
          "positionKm": [
            -12499.44,
            -3197.913,
            -3526.882
          ],
          "moonPositionKm": [
            -365947.876,
            -127819.721,
            -82561.634
          ]
        },
        {
          "timestamp": "2026-04-03T00:00:00Z",
          "positionKm": [
            -12467.651,
            -3194.689,
            -3770.223
          ],
          "moonPositionKm": [
            -363392.052,
            -133765.009,
            -85658.833
          ]
        },
        {
          "timestamp": "2026-04-03T02:00:00Z",
          "positionKm": [
            -12443.869,
            -3167.587,
            -4028.966
          ],
          "moonPositionKm": [
            -360715.959,
            -139665.658,
            -88727.345
          ]
        },
        {
          "timestamp": "2026-04-03T04:00:00Z",
          "positionKm": [
            -12430.17,
            -3115.907,
            -4304.108
          ],
          "moonPositionKm": [
            -357920.736,
            -145519.772,
            -91766.195
          ]
        },
        {
          "timestamp": "2026-04-03T06:00:00Z",
          "positionKm": [
            -12429,
            -3039.185,
            -4596.735
          ],
          "moonPositionKm": [
            -355007.554,
            -151325.481,
            -94774.423
          ]
        },
        {
          "timestamp": "2026-04-03T08:00:00Z",
          "positionKm": [
            -12443.246,
            -2937.263,
            -4908.047
          ],
          "moonPositionKm": [
            -351977.618,
            -157080.933,
            -97751.081
          ]
        },
        {
          "timestamp": "2026-04-03T10:00:00Z",
          "positionKm": [
            -12476.326,
            -2810.383,
            -5239.408
          ],
          "moonPositionKm": [
            -348832.164,
            -162784.302,
            -100695.234
          ]
        },
        {
          "timestamp": "2026-04-03T12:00:00Z",
          "positionKm": [
            -12532.3,
            -2659.297,
            -5592.389
          ],
          "moonPositionKm": [
            -345572.46,
            -168433.785,
            -103605.961
          ]
        },
        {
          "timestamp": "2026-04-03T14:00:00Z",
          "positionKm": [
            -12615.985,
            -2485.407,
            -5968.841
          ],
          "moonPositionKm": [
            -342199.805,
            -174027.602,
            -106482.358
          ]
        },
        {
          "timestamp": "2026-04-03T16:00:00Z",
          "positionKm": [
            -12733.097,
            -2290.93,
            -6370.967
          ],
          "moonPositionKm": [
            -338715.527,
            -179563.999,
            -109323.532
          ]
        },
        {
          "timestamp": "2026-04-03T18:00:00Z",
          "positionKm": [
            -12890.401,
            -2079.106,
            -6801.424
          ],
          "moonPositionKm": [
            -335120.984,
            -185041.244,
            -112128.605
          ]
        },
        {
          "timestamp": "2026-04-03T20:00:00Z",
          "positionKm": [
            -13095.892,
            -1854.442,
            -7263.439
          ],
          "moonPositionKm": [
            -331417.562,
            -190457.631,
            -114896.715
          ]
        },
        {
          "timestamp": "2026-04-03T22:00:00Z",
          "positionKm": [
            -13358.98,
            -1623.002,
            -7760.944
          ],
          "moonPositionKm": [
            -327606.676,
            -195811.479,
            -117627.012
          ]
        },
        {
          "timestamp": "2026-04-04T00:00:00Z",
          "positionKm": [
            -13690.699,
            -1392.756,
            -8298.748
          ],
          "moonPositionKm": [
            -323689.769,
            -201101.132,
            -120318.662
          ]
        },
        {
          "timestamp": "2026-04-04T02:00:00Z",
          "positionKm": [
            -14103.939,
            -1173.989,
            -8882.726
          ],
          "moonPositionKm": [
            -319668.308,
            -206324.959,
            -122970.846
          ]
        },
        {
          "timestamp": "2026-04-04T04:00:00Z",
          "positionKm": [
            -14613.683,
            -979.772,
            -9520.054
          ],
          "moonPositionKm": [
            -315543.789,
            -211481.356,
            -125582.76
          ]
        },
        {
          "timestamp": "2026-04-04T06:00:00Z",
          "positionKm": [
            -15237.266,
            -826.519,
            -10219.472
          ],
          "moonPositionKm": [
            -311317.733,
            -216568.744,
            -128153.615
          ]
        },
        {
          "timestamp": "2026-04-04T08:00:00Z",
          "positionKm": [
            -15994.642,
            -734.629,
            -10991.596
          ],
          "moonPositionKm": [
            -306991.686,
            -221585.568,
            -130682.635
          ]
        },
        {
          "timestamp": "2026-04-04T10:00:00Z",
          "positionKm": [
            -16908.663,
            -729.215,
            -11849.277
          ],
          "moonPositionKm": [
            -302567.216,
            -226530.304,
            -133169.062
          ]
        },
        {
          "timestamp": "2026-04-04T12:00:00Z",
          "positionKm": [
            -18005.36,
            -840.953,
            -12808.004
          ],
          "moonPositionKm": [
            -298045.917,
            -231401.45,
            -135612.152
          ]
        },
        {
          "timestamp": "2026-04-04T14:00:00Z",
          "positionKm": [
            -19314.22,
            -1107.035,
            -13886.382
          ],
          "moonPositionKm": [
            -293429.406,
            -236197.532,
            -138011.176
          ]
        },
        {
          "timestamp": "2026-04-04T16:00:00Z",
          "positionKm": [
            -20868.468,
            -1572.259,
            -15106.657
          ],
          "moonPositionKm": [
            -288719.322,
            -240917.105,
            -140365.419
          ]
        },
        {
          "timestamp": "2026-04-04T18:00:00Z",
          "positionKm": [
            -22705.319,
            -2290.252,
            -16495.326
          ],
          "moonPositionKm": [
            -283917.326,
            -245558.747,
            -142674.185
          ]
        },
        {
          "timestamp": "2026-04-04T20:00:00Z",
          "positionKm": [
            -24866.224,
            -3324.843,
            -18083.813
          ],
          "moonPositionKm": [
            -279025.101,
            -250121.065,
            -144936.789
          ]
        },
        {
          "timestamp": "2026-04-04T22:00:00Z",
          "positionKm": [
            -27397.073,
            -4751.611,
            -19909.24
          ],
          "moonPositionKm": [
            -274044.349,
            -254602.694,
            -147152.565
          ]
        },
        {
          "timestamp": "2026-04-05T00:00:00Z",
          "positionKm": [
            -30348.361,
            -6659.593,
            -22015.285
          ],
          "moonPositionKm": [
            -268976.793,
            -259002.295,
            -149320.861
          ]
        },
        {
          "timestamp": "2026-04-05T02:00:00Z",
          "positionKm": [
            -33775.297,
            -9153.192,
            -24453.139
          ],
          "moonPositionKm": [
            -263824.177,
            -263318.556,
            -151441.04
          ]
        },
        {
          "timestamp": "2026-04-05T04:00:00Z",
          "positionKm": [
            -37737.842,
            -12354.281,
            -27282.58
          ],
          "moonPositionKm": [
            -258588.262,
            -267550.192,
            -153512.481
          ]
        },
        {
          "timestamp": "2026-04-05T06:00:00Z",
          "positionKm": [
            -42300.67,
            -16404.526,
            -30573.156
          ],
          "moonPositionKm": [
            -253270.829,
            -271695.948,
            -155534.579
          ]
        },
        {
          "timestamp": "2026-04-05T08:00:00Z",
          "positionKm": [
            -47533.016,
            -21467.932,
            -34405.502
          ],
          "moonPositionKm": [
            -247873.677,
            -275754.594,
            -157506.743
          ]
        },
        {
          "timestamp": "2026-04-05T10:00:00Z",
          "positionKm": [
            -53508.407,
            -27733.628,
            -38872.79
          ],
          "moonPositionKm": [
            -242398.621,
            -279724.929,
            -159428.4
          ]
        },
        {
          "timestamp": "2026-04-05T12:00:00Z",
          "positionKm": [
            -60304.256,
            -35418.909,
            -44082.333
          ],
          "moonPositionKm": [
            -236847.495,
            -283605.778,
            -161298.991
          ]
        },
        {
          "timestamp": "2026-04-05T14:00:00Z",
          "positionKm": [
            -68001.283,
            -44772.536,
            -50157.337
          ],
          "moonPositionKm": [
            -231222.147,
            -287395.997,
            -163117.972
          ]
        },
        {
          "timestamp": "2026-04-05T16:00:00Z",
          "positionKm": [
            -76682.752,
            -56078.312,
            -57238.829
          ],
          "moonPositionKm": [
            -225524.444,
            -291094.465,
            -164884.816
          ]
        },
        {
          "timestamp": "2026-04-05T18:00:00Z",
          "positionKm": [
            -86433.486,
            -69658.948,
            -65487.766
          ],
          "moonPositionKm": [
            -219756.266,
            -294700.093,
            -166599.011
          ]
        },
        {
          "timestamp": "2026-04-05T20:00:00Z",
          "positionKm": [
            -97338.646,
            -85880.216,
            -75087.329
          ],
          "moonPositionKm": [
            -213919.51,
            -298211.818,
            -168260.061
          ]
        },
        {
          "timestamp": "2026-04-05T22:00:00Z",
          "positionKm": [
            -109482.227,
            -105155.413,
            -86245.419
          ],
          "moonPositionKm": [
            -208016.085,
            -301628.604,
            -169867.484
          ]
        },
        {
          "timestamp": "2026-04-06T00:00:00Z",
          "positionKm": [
            -122945.25,
            -127950.134,
            -99197.373
          ],
          "moonPositionKm": [
            -202047.917,
            -304949.445,
            -171420.816
          ]
        },
        {
          "timestamp": "2026-04-06T02:00:00Z",
          "positionKm": [
            -135521.286,
            -151290.679,
            -112236.975
          ],
          "moonPositionKm": [
            -196016.943,
            -308173.362,
            -172919.606
          ]
        },
        {
          "timestamp": "2026-04-06T04:00:00Z",
          "positionKm": [
            -145245.745,
            -172057.272,
            -123612.69
          ],
          "moonPositionKm": [
            -189925.115,
            -311299.402,
            -174363.421
          ]
        },
        {
          "timestamp": "2026-04-06T06:00:00Z",
          "positionKm": [
            -152517.385,
            -190520.748,
            -133502.866
          ],
          "moonPositionKm": [
            -183774.398,
            -314326.643,
            -175751.842
          ]
        },
        {
          "timestamp": "2026-04-06T08:00:00Z",
          "positionKm": [
            -157684.352,
            -206928.91,
            -142071.166
          ],
          "moonPositionKm": [
            -177566.768,
            -317254.189,
            -177084.465
          ]
        },
        {
          "timestamp": "2026-04-06T10:00:00Z",
          "positionKm": [
            -161049.726,
            -221507.622,
            -149467.142
          ],
          "moonPositionKm": [
            -171304.214,
            -320081.173,
            -178360.903
          ]
        },
        {
          "timestamp": "2026-04-06T12:00:00Z",
          "positionKm": [
            -162876.577,
            -234461.969,
            -155826.873
          ],
          "moonPositionKm": [
            -164988.735,
            -322806.754,
            -179580.784
          ]
        },
        {
          "timestamp": "2026-04-06T14:00:00Z",
          "positionKm": [
            -163392.557,
            -245977.454,
            -161273.657
          ],
          "moonPositionKm": [
            -158622.344,
            -325430.122,
            -180743.752
          ]
        },
        {
          "timestamp": "2026-04-06T16:00:00Z",
          "positionKm": [
            -162794.058,
            -256221.218,
            -165918.74
          ],
          "moonPositionKm": [
            -152207.062,
            -327950.491,
            -181849.464
          ]
        },
        {
          "timestamp": "2026-04-06T18:00:00Z",
          "positionKm": [
            -161249.977,
            -265343.269,
            -169862.066
          ],
          "moonPositionKm": [
            -145744.921,
            -330367.107,
            -182897.596
          ]
        },
        {
          "timestamp": "2026-04-06T20:00:00Z",
          "positionKm": [
            -158905.1,
            -273477.696,
            -173193.036
          ],
          "moonPositionKm": [
            -139237.965,
            -332679.241,
            -183887.838
          ]
        },
        {
          "timestamp": "2026-04-06T22:00:00Z",
          "positionKm": [
            -155883.145,
            -280743.869,
            -175991.275
          ],
          "moonPositionKm": [
            -132688.246,
            -334886.193,
            -184819.893
          ]
        },
        {
          "timestamp": "2026-04-07T00:00:00Z",
          "positionKm": [
            -152289.489,
            -287247.612,
            -178327.377
          ],
          "moonPositionKm": [
            -126097.825,
            -336987.291,
            -185693.483
          ]
        },
        {
          "timestamp": "2026-04-07T02:00:00Z",
          "positionKm": [
            -148213.596,
            -293082.333,
            -180263.649
          ],
          "moonPositionKm": [
            -119468.773,
            -338981.891,
            -186508.344
          ]
        },
        {
          "timestamp": "2026-04-07T04:00:00Z",
          "positionKm": [
            -143731.179,
            -298330.118,
            -181854.82
          ],
          "moonPositionKm": [
            -112803.169,
            -340869.376,
            -187264.228
          ]
        },
        {
          "timestamp": "2026-04-07T06:00:00Z",
          "positionKm": [
            -138906.119,
            -303062.767,
            -183148.729
          ],
          "moonPositionKm": [
            -106103.101,
            -342649.159,
            -187960.9
          ]
        },
        {
          "timestamp": "2026-04-07T08:00:00Z",
          "positionKm": [
            -133792.157,
            -307342.786,
            -184186.98
          ],
          "moonPositionKm": [
            -99370.664,
            -344320.679,
            -188598.143
          ]
        },
        {
          "timestamp": "2026-04-07T10:00:00Z",
          "positionKm": [
            -128434.376,
            -311224.319,
            -185005.564
          ],
          "moonPositionKm": [
            -92607.962,
            -345883.404,
            -189175.755
          ]
        },
        {
          "timestamp": "2026-04-07T12:00:00Z",
          "positionKm": [
            -122870.516,
            -314754.026,
            -185635.439
          ],
          "moonPositionKm": [
            -85817.105,
            -347336.829,
            -189693.548
          ]
        },
        {
          "timestamp": "2026-04-07T14:00:00Z",
          "positionKm": [
            -117132.101,
            -317971.897,
            -186103.079
          ],
          "moonPositionKm": [
            -79000.212,
            -348680.478,
            -190151.35
          ]
        },
        {
          "timestamp": "2026-04-07T16:00:00Z",
          "positionKm": [
            -111245.43,
            -320912.014,
            -186430.981
          ],
          "moonPositionKm": [
            -72159.407,
            -349913.902,
            -190549.006
          ]
        },
        {
          "timestamp": "2026-04-07T18:00:00Z",
          "positionKm": [
            -105232.433,
            -323603.249,
            -186638.131
          ],
          "moonPositionKm": [
            -65296.821,
            -351036.682,
            -190886.373
          ]
        },
        {
          "timestamp": "2026-04-07T20:00:00Z",
          "positionKm": [
            -99111.402,
            -326069.91,
            -186740.439
          ],
          "moonPositionKm": [
            -58414.591,
            -352048.424,
            -191163.327
          ]
        },
        {
          "timestamp": "2026-04-07T22:00:00Z",
          "positionKm": [
            -92897.619,
            -328332.324,
            -186751.125
          ],
          "moonPositionKm": [
            -51514.862,
            -352948.766,
            -191379.756
          ]
        },
        {
          "timestamp": "2026-04-08T00:00:00Z",
          "positionKm": [
            -86603.888,
            -330407.375,
            -186681.083
          ],
          "moonPositionKm": [
            -44599.781,
            -353737.371,
            -191535.566
          ]
        },
        {
          "timestamp": "2026-04-08T02:00:00Z",
          "positionKm": [
            -80240.989,
            -332308.982,
            -186539.196
          ],
          "moonPositionKm": [
            -37671.503,
            -354413.931,
            -191630.678
          ]
        },
        {
          "timestamp": "2026-04-08T04:00:00Z",
          "positionKm": [
            -73818.055,
            -334048.53,
            -186332.63
          ],
          "moonPositionKm": [
            -30732.189,
            -354978.167,
            -191665.026
          ]
        },
        {
          "timestamp": "2026-04-08T06:00:00Z",
          "positionKm": [
            -67342.89,
            -335635.259,
            -186067.087
          ],
          "moonPositionKm": [
            -23784.001,
            -355429.827,
            -191638.563
          ]
        },
        {
          "timestamp": "2026-04-08T08:00:00Z",
          "positionKm": [
            -60822.227,
            -337076.602,
            -185747.036
          ],
          "moonPositionKm": [
            -16829.11,
            -355768.69,
            -191551.254
          ]
        },
        {
          "timestamp": "2026-04-08T10:00:00Z",
          "positionKm": [
            -54261.944,
            -338378.486,
            -185375.91
          ],
          "moonPositionKm": [
            -9869.689,
            -355994.559,
            -191403.082
          ]
        },
        {
          "timestamp": "2026-04-08T12:00:00Z",
          "positionKm": [
            -47667.242,
            -339545.593,
            -184956.285
          ],
          "moonPositionKm": [
            -2907.914,
            -356107.27,
            -191194.045
          ]
        },
        {
          "timestamp": "2026-04-08T14:00:00Z",
          "positionKm": [
            -41042.783,
            -340581.59,
            -184490.031
          ],
          "moonPositionKm": [
            4054.032,
            -356106.685,
            -190924.155
          ]
        },
        {
          "timestamp": "2026-04-08T16:00:00Z",
          "positionKm": [
            -34392.802,
            -341489.323,
            -183978.441
          ],
          "moonPositionKm": [
            11013.965,
            -355992.695,
            -190593.442
          ]
        },
        {
          "timestamp": "2026-04-08T18:00:00Z",
          "positionKm": [
            -27721.203,
            -342270.985,
            -183422.345
          ],
          "moonPositionKm": [
            17969.697,
            -355765.22,
            -190201.95
          ]
        },
        {
          "timestamp": "2026-04-08T20:00:00Z",
          "positionKm": [
            -21031.619,
            -342928.252,
            -182822.205
          ],
          "moonPositionKm": [
            24919.037,
            -355424.21,
            -189749.737
          ]
        },
        {
          "timestamp": "2026-04-08T22:00:00Z",
          "positionKm": [
            -14327.477,
            -343462.411,
            -182178.192
          ],
          "moonPositionKm": [
            31859.79,
            -354969.642,
            -189236.881
          ]
        },
        {
          "timestamp": "2026-04-09T00:00:00Z",
          "positionKm": [
            -7612.031,
            -343874.444,
            -181490.256
          ],
          "moonPositionKm": [
            38789.761,
            -354401.523,
            -188663.472
          ]
        },
        {
          "timestamp": "2026-04-09T02:00:00Z",
          "positionKm": [
            -888.398,
            -344165.121,
            -180758.175
          ],
          "moonPositionKm": [
            45706.751,
            -353719.889,
            -188029.618
          ]
        },
        {
          "timestamp": "2026-04-09T04:00:00Z",
          "positionKm": [
            5840.418,
            -344335.052,
            -179981.606
          ],
          "moonPositionKm": [
            52608.559,
            -352924.805,
            -187335.44
          ]
        },
        {
          "timestamp": "2026-04-09T06:00:00Z",
          "positionKm": [
            12571.511,
            -344384.745,
            -179160.114
          ],
          "moonPositionKm": [
            59492.982,
            -352016.367,
            -186581.079
          ]
        },
        {
          "timestamp": "2026-04-09T08:00:00Z",
          "positionKm": [
            19302.058,
            -344314.645,
            -178293.202
          ],
          "moonPositionKm": [
            66357.818,
            -350994.698,
            -185766.689
          ]
        },
        {
          "timestamp": "2026-04-09T10:00:00Z",
          "positionKm": [
            26029.308,
            -344125.159,
            -177380.334
          ],
          "moonPositionKm": [
            73200.861,
            -349859.953,
            -184892.44
          ]
        },
        {
          "timestamp": "2026-04-09T12:00:00Z",
          "positionKm": [
            32750.578,
            -343816.683,
            -176420.949
          ],
          "moonPositionKm": [
            80019.905,
            -348612.317,
            -183958.52
          ]
        },
        {
          "timestamp": "2026-04-09T14:00:00Z",
          "positionKm": [
            39463.243,
            -343389.617,
            -175414.476
          ],
          "moonPositionKm": [
            86812.744,
            -347252.002,
            -182965.132
          ]
        },
        {
          "timestamp": "2026-04-09T16:00:00Z",
          "positionKm": [
            46164.734,
            -342844.373,
            -174360.34
          ],
          "moonPositionKm": [
            93577.172,
            -345779.253,
            -181912.494
          ]
        },
        {
          "timestamp": "2026-04-09T18:00:00Z",
          "positionKm": [
            52852.533,
            -342181.386,
            -173257.967
          ],
          "moonPositionKm": [
            100310.982,
            -344194.345,
            -180800.842
          ]
        },
        {
          "timestamp": "2026-04-09T20:00:00Z",
          "positionKm": [
            59524.169,
            -341401.115,
            -172106.794
          ],
          "moonPositionKm": [
            107011.967,
            -342497.583,
            -179630.429
          ]
        },
        {
          "timestamp": "2026-04-09T22:00:00Z",
          "positionKm": [
            66177.215,
            -340504.048,
            -170906.266
          ],
          "moonPositionKm": [
            113677.923,
            -340689.303,
            -178401.523
          ]
        },
        {
          "timestamp": "2026-04-10T00:00:00Z",
          "positionKm": [
            72809.285,
            -339490.697,
            -169655.838
          ],
          "moonPositionKm": [
            120306.645,
            -338769.871,
            -177114.409
          ]
        },
        {
          "timestamp": "2026-04-10T02:00:00Z",
          "positionKm": [
            79418.03,
            -338361.605,
            -168354.979
          ],
          "moonPositionKm": [
            126895.929,
            -336739.687,
            -175769.388
          ]
        },
        {
          "timestamp": "2026-04-10T04:00:00Z",
          "positionKm": [
            86001.135,
            -337117.338,
            -167003.169
          ],
          "moonPositionKm": [
            133443.574,
            -334599.179,
            -174366.779
          ]
        },
        {
          "timestamp": "2026-04-10T06:00:00Z",
          "positionKm": [
            92556.319,
            -335758.489,
            -165599.898
          ],
          "moonPositionKm": [
            139947.381,
            -332348.808,
            -172906.919
          ]
        },
        {
          "timestamp": "2026-04-10T08:00:00Z",
          "positionKm": [
            99081.329,
            -334285.672,
            -164144.669
          ],
          "moonPositionKm": [
            146405.153,
            -329989.067,
            -171390.158
          ]
        },
        {
          "timestamp": "2026-04-10T10:00:00Z",
          "positionKm": [
            105573.939,
            -332699.523,
            -162636.998
          ],
          "moonPositionKm": [
            152814.696,
            -327520.481,
            -169816.866
          ]
        },
        {
          "timestamp": "2026-04-10T12:00:00Z",
          "positionKm": [
            112031.947,
            -331000.698,
            -161076.409
          ],
          "moonPositionKm": [
            159173.819,
            -324943.607,
            -168187.43
          ]
        },
        {
          "timestamp": "2026-04-10T14:00:00Z",
          "positionKm": [
            118942.081,
            -330141.971,
            -159949.864
          ],
          "moonPositionKm": [
            165480.335,
            -322259.033,
            -166502.255
          ]
        },
        {
          "timestamp": "2026-04-10T16:00:00Z",
          "positionKm": [
            125348.45,
            -328221.958,
            -158250.87
          ],
          "moonPositionKm": [
            171732.06,
            -319467.384,
            -164761.76
          ]
        },
        {
          "timestamp": "2026-04-10T18:00:00Z",
          "positionKm": [
            131723.886,
            -326207.961,
            -156452.592
          ],
          "moonPositionKm": [
            177926.816,
            -316569.312,
            -162966.385
          ]
        },
        {
          "timestamp": "2026-04-10T20:00:00Z",
          "positionKm": [
            138072.566,
            -324107.545,
            -154531.837
          ],
          "moonPositionKm": [
            184062.43,
            -313565.508,
            -161116.587
          ]
        },
        {
          "timestamp": "2026-04-10T22:00:00Z",
          "positionKm": [
            144399.663,
            -321925.968,
            -152464.888
          ],
          "moonPositionKm": [
            190136.733,
            -310456.692,
            -159212.84
          ]
        },
        {
          "timestamp": "2026-04-11T00:00:00Z",
          "positionKm": [
            150710.706,
            -319663.52,
            -150226.648
          ],
          "moonPositionKm": [
            196147.562,
            -307243.62,
            -157255.635
          ]
        },
        {
          "timestamp": "2026-04-11T02:00:00Z",
          "positionKm": [
            157008.84,
            -317309.677,
            -147788.524
          ],
          "moonPositionKm": [
            202092.763,
            -303927.082,
            -155245.483
          ]
        },
        {
          "timestamp": "2026-04-11T04:00:00Z",
          "positionKm": [
            163287.663,
            -314831.585,
            -145114.036
          ],
          "moonPositionKm": [
            207970.187,
            -300507.901,
            -153182.911
          ]
        },
        {
          "timestamp": "2026-04-11T06:00:00Z",
          "positionKm": [
            169516.017,
            -312153.43,
            -142150.73
          ],
          "moonPositionKm": [
            213777.691,
            -296986.936,
            -151068.466
          ]
        },
        {
          "timestamp": "2026-04-11T08:00:00Z",
          "positionKm": [
            175609.372,
            -309122.158,
            -138816.566
          ],
          "moonPositionKm": [
            219513.144,
            -293365.079,
            -148902.713
          ]
        },
        {
          "timestamp": "2026-04-11T10:00:00Z",
          "positionKm": [
            181380.314,
            -305453.969,
            -134978.539
          ],
          "moonPositionKm": [
            225174.42,
            -289643.258,
            -146686.234
          ]
        },
        {
          "timestamp": "2026-04-11T12:00:00Z",
          "positionKm": [
            186458.104,
            -300655.016,
            -130420.809
          ],
          "moonPositionKm": [
            230759.405,
            -285822.436,
            -144419.631
          ]
        },
        {
          "timestamp": "2026-04-11T14:00:00Z",
          "positionKm": [
            190164.236,
            -293908.841,
            -124799.188
          ],
          "moonPositionKm": [
            236265.993,
            -281903.612,
            -142103.525
          ]
        },
        {
          "timestamp": "2026-04-11T16:00:00Z",
          "positionKm": [
            191327.501,
            -283922.507,
            -117578.152
          ],
          "moonPositionKm": [
            241692.089,
            -277887.821,
            -139738.553
          ]
        },
        {
          "timestamp": "2026-04-11T18:00:00Z",
          "positionKm": [
            188018.217,
            -268723.023,
            -107945.729
          ],
          "moonPositionKm": [
            247035.611,
            -273776.131,
            -137325.375
          ]
        },
        {
          "timestamp": "2026-04-11T20:00:00Z",
          "positionKm": [
            177177.07,
            -245395.799,
            -94700.34
          ],
          "moonPositionKm": [
            252294.487,
            -269569.651,
            -134864.666
          ]
        },
        {
          "timestamp": "2026-04-11T22:00:00Z",
          "positionKm": [
            154109.495,
            -209757.412,
            -76101.862
          ],
          "moonPositionKm": [
            257466.659,
            -265269.522,
            -132357.122
          ]
        },
        {
          "timestamp": "2026-04-12T00:00:00Z",
          "positionKm": [
            111811.715,
            -155956.015,
            -49676.931
          ],
          "moonPositionKm": [
            262550.08,
            -260876.926,
            -129803.459
          ]
        },
        {
          "timestamp": "2026-04-12T02:00:00Z",
          "positionKm": [
            67610.846,
            -103087.851,
            -25096.719
          ],
          "moonPositionKm": [
            267542.72,
            -256393.078,
            -127204.41
          ]
        },
        {
          "timestamp": "2026-04-12T04:00:00Z",
          "positionKm": [
            40223.616,
            -69292.224,
            -10877.956
          ],
          "moonPositionKm": [
            272442.563,
            -251819.231,
            -124560.729
          ]
        },
        {
          "timestamp": "2026-04-12T06:00:00Z",
          "positionKm": [
            24016.286,
            -47876.321,
            -3259.026
          ],
          "moonPositionKm": [
            277247.609,
            -247156.679,
            -121873.189
          ]
        },
        {
          "timestamp": "2026-04-12T08:00:00Z",
          "positionKm": [
            15002.924,
            -34332.677,
            323.592
          ],
          "moonPositionKm": [
            281955.873,
            -242406.748,
            -119142.582
          ]
        },
        {
          "timestamp": "2026-04-12T10:00:00Z",
          "positionKm": [
            10438.858,
            -25697.444,
            1565.161
          ],
          "moonPositionKm": [
            286565.39,
            -237570.806,
            -116369.72
          ]
        },
        {
          "timestamp": "2026-04-12T12:00:00Z",
          "positionKm": [
            8492.337,
            -20073.071,
            1548.689
          ],
          "moonPositionKm": [
            291074.212,
            -232650.256,
            -113555.435
          ]
        },
        {
          "timestamp": "2026-04-12T14:00:00Z",
          "positionKm": [
            7985.119,
            -16279.856,
            938.292
          ],
          "moonPositionKm": [
            295480.411,
            -227646.542,
            -110700.577
          ]
        },
        {
          "timestamp": "2026-04-12T16:00:00Z",
          "positionKm": [
            8192.461,
            -13607.074,
            120.937
          ],
          "moonPositionKm": [
            299782.078,
            -222561.143,
            -107806.018
          ]
        },
        {
          "timestamp": "2026-04-12T18:00:00Z",
          "positionKm": [
            8693.104,
            -11639.732,
            -692.978
          ],
          "moonPositionKm": [
            303977.327,
            -217395.58,
            -104872.647
          ]
        },
        {
          "timestamp": "2026-04-12T20:00:00Z",
          "positionKm": [
            9260.303,
            -10141.602,
            -1400.784
          ],
          "moonPositionKm": [
            308064.292,
            -212151.409,
            -101901.376
          ]
        },
        {
          "timestamp": "2026-04-12T22:00:00Z",
          "positionKm": [
            9785.597,
            -8979.099,
            -1962.296
          ],
          "moonPositionKm": [
            312041.133,
            -206830.226,
            -98893.134
          ]
        },
        {
          "timestamp": "2026-04-13T00:00:00Z",
          "positionKm": [
            10227.849,
            -8073.908,
            -2371.452
          ],
          "moonPositionKm": [
            315906.033,
            -201433.666,
            -95848.871
          ]
        },
        {
          "timestamp": "2026-04-13T02:00:00Z",
          "positionKm": [
            10581.003,
            -7375.099,
            -2639.518
          ],
          "moonPositionKm": [
            319657.198,
            -195963.401,
            -92769.556
          ]
        },
        {
          "timestamp": "2026-04-13T04:00:00Z",
          "positionKm": [
            10855.067,
            -6843.813,
            -2785.809
          ],
          "moonPositionKm": [
            323292.866,
            -190421.146,
            -89656.178
          ]
        },
        {
          "timestamp": "2026-04-13T06:00:00Z",
          "positionKm": [
            11065.866,
            -6445.615,
            -2833.012
          ],
          "moonPositionKm": [
            326811.296,
            -184808.648,
            -86509.746
          ]
        },
        {
          "timestamp": "2026-04-13T08:00:00Z",
          "positionKm": [
            11230.159,
            -6147.12,
            -2805.091
          ],
          "moonPositionKm": [
            330210.781,
            -179127.699,
            -83331.289
          ]
        },
        {
          "timestamp": "2026-04-13T10:00:00Z",
          "positionKm": [
            11363.689,
            -5914.773,
            -2726.493
          ],
          "moonPositionKm": [
            333489.642,
            -173380.126,
            -80121.853
          ]
        },
        {
          "timestamp": "2026-04-13T12:00:00Z",
          "positionKm": [
            11480.593,
            -5714.538,
            -2621.912
          ],
          "moonPositionKm": [
            336646.23,
            -167567.796,
            -76882.507
          ]
        }
      ]
    },
    "events": {
      "missionId": "artemis-ii",
      "events": [
        {
          "id": "launch",
          "timestamp": "2026-04-01T12:00:00Z",
          "title": "Launch",
          "type": "mission",
          "description": "SLS Block 1 lifts Artemis II toward parking orbit."
        },
        {
          "id": "tli",
          "timestamp": "2026-04-02T08:00:00Z",
          "title": "Trans-lunar injection",
          "type": "burn",
          "description": "Upper stage performs the translunar injection burn."
        },
        {
          "id": "earth-departure-photo",
          "timestamp": "2026-04-03T00:00:00Z",
          "title": "Blue marble window",
          "type": "media",
          "description": "Iconic Earth receding view from Orion.",
          "media": {
            "kind": "photo",
            "credit": "NASA concept art"
          }
        },
        {
          "id": "midcourse-1",
          "timestamp": "2026-04-05T04:00:00Z",
          "title": "Midcourse correction",
          "type": "burn",
          "description": "Trim burn refines free-return trajectory."
        },
        {
          "id": "closest-approach",
          "timestamp": "2026-04-10T12:00:00Z",
          "title": "Closest lunar approach",
          "type": "milestone",
          "description": "Orion sweeps behind the Moon on a crewed lunar flyby."
        },
        {
          "id": "story-burn",
          "timestamp": "2026-04-11T00:00:00Z",
          "title": "Story beat: far side blackout",
          "type": "story",
          "description": "Mission control temporarily loses direct line of sight as Orion passes behind the Moon."
        },
        {
          "id": "return-arc",
          "timestamp": "2026-04-11T20:00:00Z",
          "title": "Return arc established",
          "type": "mission",
          "description": "Free-return arc commits the crew to Earth return."
        },
        {
          "id": "splashdown",
          "timestamp": "2026-04-13T12:00:00Z",
          "title": "Splashdown",
          "type": "mission",
          "description": "Pacific Ocean splashdown and recovery."
        }
      ]
    },
    "latest_state": {
      "missionId": "artemis-ii",
      "asOf": "2026-04-05T12:00:00Z",
      "sampleIndex": 48,
      "mode": "latest",
      "summary": "Orion is on the outbound translunar coast, using a modeled path against real Moon ephemerides.",
      "nearestSampleOffsetMinutes": 24,
      "cadenceHours": 2,
      "source": {
        "kind": "generated",
        "generatedAt": "2026-04-05T11:36:18.781Z",
        "description": "Latest-state is computed from the generated Artemis II trajectory by snapping the current wall clock to the nearest sample."
      }
    },
    "media": {
      "missionId": "artemis-ii",
      "items": [
        {
          "id": "crew-patch",
          "eventId": "launch",
          "title": "Artemis II crew patch",
          "caption": "Crew identity marker for launch sequence.",
          "url": "https://images-assets.nasa.gov/image/iss063e094106/iss063e094106~orig.jpg"
        },
        {
          "id": "earthrise",
          "eventId": "closest-approach",
          "title": "Earthrise concept frame",
          "caption": "Story marker for far-side pass.",
          "url": "https://images-assets.nasa.gov/image/as11-44-6551/as11-44-6551~orig.jpg"
        }
      ]
    }
  },
  "artemis-i": {
    "trajectory": {
      "missionId": "artemis-i",
      "frame": "earth-centered-icrf",
      "units": {
        "distance": "km",
        "time": "iso8601"
      },
      "spacecraft": "Orion",
      "source": {
        "kind": "historical-horizons-spacecraft",
        "generatedAt": "2026-04-05T11:41:22.779Z",
        "description": "Historical Artemis I vectors are sampled from the public JPL Horizons spacecraft target.",
        "fidelity": {
          "earthMoonGeometry": "Moon vectors come from JPL Horizons in the same Earth-centered frame used for the spacecraft solution.",
          "spacecraftEphemeris": "Artemis I / Orion spacecraft state vectors come directly from the public JPL Horizons spacecraft target (-1023).",
          "viewerScene": "The path is mission-specific and flown, but the browser scene is still a stylized visualization."
        },
        "horizons": {
          "target": "-1023",
          "center": "500@399",
          "ephemerisType": "VECTORS",
          "stepSize": "6 h",
          "referenceFrame": "ICRF"
        }
      },
      "bodyCenters": {
        "earth": [
          0,
          0,
          0
        ],
        "moon": [
          -313994.362,
          213540.308,
          132412.594
        ]
      },
      "samples": [
        {
          "timestamp": "2022-11-16T09:03:00Z",
          "positionKm": [
            -10147.288,
            10312.925,
            7066.845
          ],
          "moonPositionKm": [
            -313994.362,
            213540.308,
            132412.594
          ]
        },
        {
          "timestamp": "2022-11-16T15:03:00Z",
          "positionKm": [
            -88338.82,
            -5723.597,
            6161.367
          ],
          "moonPositionKm": [
            -326050.7,
            197927.278,
            125206.835
          ]
        },
        {
          "timestamp": "2022-11-16T21:03:00Z",
          "positionKm": [
            -133391.723,
            -23173.667,
            826.306
          ],
          "moonPositionKm": [
            -337152.363,
            181734.495,
            117634.362
          ]
        },
        {
          "timestamp": "2022-11-17T03:03:00Z",
          "positionKm": [
            -167796.85,
            -38904.053,
            -4651.606
          ],
          "moonPositionKm": [
            -347261.757,
            165005.478,
            109714.998
          ]
        },
        {
          "timestamp": "2022-11-17T09:03:00Z",
          "positionKm": [
            -195943.434,
            -53204.781,
            -9969.425
          ],
          "moonPositionKm": [
            -356343.233,
            147785.586,
            101469.657
          ]
        },
        {
          "timestamp": "2022-11-17T15:03:00Z",
          "positionKm": [
            -219693.384,
            -66312.589,
            -15066.534
          ],
          "moonPositionKm": [
            -364363.19,
            130122.008,
            92920.343
          ]
        },
        {
          "timestamp": "2022-11-17T21:03:00Z",
          "positionKm": [
            -240064.011,
            -78393.657,
            -19928.879
          ],
          "moonPositionKm": [
            -371290.201,
            112063.752,
            84090.152
          ]
        },
        {
          "timestamp": "2022-11-18T03:03:00Z",
          "positionKm": [
            -257677.37,
            -89559.018,
            -24555.466
          ],
          "moonPositionKm": [
            -377095.146,
            93661.613,
            75003.266
          ]
        },
        {
          "timestamp": "2022-11-18T09:03:00Z",
          "positionKm": [
            -272959.961,
            -99885.563,
            -28949.23
          ],
          "moonPositionKm": [
            -381751.355,
            74968.152,
            65684.953
          ]
        },
        {
          "timestamp": "2022-11-18T15:03:00Z",
          "positionKm": [
            -286206.782,
            -109448.097,
            -33115.184
          ],
          "moonPositionKm": [
            -385234.766,
            56037.658,
            56161.556
          ]
        },
        {
          "timestamp": "2022-11-18T21:03:00Z",
          "positionKm": [
            -297643.108,
            -118286.039,
            -37055.665
          ],
          "moonPositionKm": [
            -387524.086,
            36926.094,
            46460.479
          ]
        },
        {
          "timestamp": "2022-11-19T03:03:00Z",
          "positionKm": [
            -307439.687,
            -126431.859,
            -40771.86
          ],
          "moonPositionKm": [
            -388600.971,
            17691.042,
            36610.168
          ]
        },
        {
          "timestamp": "2022-11-19T09:03:00Z",
          "positionKm": [
            -315733.803,
            -133903.987,
            -44247.795
          ],
          "moonPositionKm": [
            -388450.215,
            -1608.378,
            26640.086
          ]
        },
        {
          "timestamp": "2022-11-19T15:03:00Z",
          "positionKm": [
            -322627.812,
            -140720.821,
            -47507.269
          ],
          "moonPositionKm": [
            -387059.937,
            -20911.599,
            16580.676
          ]
        },
        {
          "timestamp": "2022-11-19T21:03:00Z",
          "positionKm": [
            -328208.432,
            -146886.178,
            -50554.664
          ],
          "moonPositionKm": [
            -384421.786,
            -40156.72,
            6463.32
          ]
        },
        {
          "timestamp": "2022-11-20T03:03:00Z",
          "positionKm": [
            -332559.602,
            -152382.485,
            -53335.649
          ],
          "moonPositionKm": [
            -380531.146,
            -59280.64,
            -3679.721
          ]
        },
        {
          "timestamp": "2022-11-20T09:03:00Z",
          "positionKm": [
            -335745.785,
            -157193.856,
            -55831.438
          ],
          "moonPositionKm": [
            -375387.34,
            -78219.218,
            -13815.368
          ]
        },
        {
          "timestamp": "2022-11-20T15:03:00Z",
          "positionKm": [
            -337823.917,
            -161255.312,
            -58050.477
          ],
          "moonPositionKm": [
            -368993.838,
            -96907.448,
            -23909.807
          ]
        },
        {
          "timestamp": "2022-11-20T21:03:00Z",
          "positionKm": [
            -338871.313,
            -164465.485,
            -59916.367
          ],
          "moonPositionKm": [
            -361358.455,
            -115279.673,
            -33928.581
          ]
        },
        {
          "timestamp": "2022-11-21T03:03:00Z",
          "positionKm": [
            -339020.039,
            -166577.54,
            -61293.077
          ],
          "moonPositionKm": [
            -352493.542,
            -133269.816,
            -43836.7
          ]
        },
        {
          "timestamp": "2022-11-21T09:03:00Z",
          "positionKm": [
            -338566.668,
            -166722.496,
            -61729.262
          ],
          "moonPositionKm": [
            -342416.166,
            -150811.646,
            -53598.759
          ]
        },
        {
          "timestamp": "2022-11-21T15:03:00Z",
          "positionKm": [
            -322919.492,
            -164326.825,
            -62112.969
          ],
          "moonPositionKm": [
            -331148.269,
            -167839.062,
            -63179.083
          ]
        },
        {
          "timestamp": "2022-11-21T21:03:00Z",
          "positionKm": [
            -295013.668,
            -183190.878,
            -73898.024
          ],
          "moonPositionKm": [
            -318716.803,
            -184286.414,
            -72541.874
          ]
        },
        {
          "timestamp": "2022-11-22T03:03:00Z",
          "positionKm": [
            -270793.113,
            -201796.786,
            -85243.914
          ],
          "moonPositionKm": [
            -305153.843,
            -200088.845,
            -81651.387
          ]
        },
        {
          "timestamp": "2022-11-22T09:03:00Z",
          "positionKm": [
            -247362.239,
            -219439.636,
            -96014.925
          ],
          "moonPositionKm": [
            -290496.658,
            -215182.651,
            -90472.106
          ]
        },
        {
          "timestamp": "2022-11-22T15:03:00Z",
          "positionKm": [
            -224000.117,
            -235970.73,
            -106194.359
          ],
          "moonPositionKm": [
            -274787.748,
            -229505.671,
            -98968.946
          ]
        },
        {
          "timestamp": "2022-11-22T21:03:00Z",
          "positionKm": [
            -200445.709,
            -251302.599,
            -115761.68
          ],
          "moonPositionKm": [
            -258074.841,
            -242997.682,
            -107107.456
          ]
        },
        {
          "timestamp": "2022-11-23T03:03:00Z",
          "positionKm": [
            -176596.395,
            -265370.067,
            -124704.418
          ],
          "moonPositionKm": [
            -240410.838,
            -255600.817,
            -114854.038
          ]
        },
        {
          "timestamp": "2022-11-23T09:03:00Z",
          "positionKm": [
            -152454.494,
            -278126.311,
            -132980.711
          ],
          "moonPositionKm": [
            -221853.707,
            -267259.977,
            -122176.168
          ]
        },
        {
          "timestamp": "2022-11-23T15:03:00Z",
          "positionKm": [
            -128056.615,
            -289541.337,
            -140579.413
          ],
          "moonPositionKm": [
            -202466.324,
            -277923.25,
            -129042.625
          ]
        },
        {
          "timestamp": "2022-11-23T21:03:00Z",
          "positionKm": [
            -103469.668,
            -299599.507,
            -147488.219
          ],
          "moonPositionKm": [
            -182316.267,
            -287542.326,
            -135423.718
          ]
        },
        {
          "timestamp": "2022-11-24T03:03:00Z",
          "positionKm": [
            -78837.811,
            -308465.984,
            -153295.415
          ],
          "moonPositionKm": [
            -161475.539,
            -296072.886,
            -141291.505
          ]
        },
        {
          "timestamp": "2022-11-24T09:03:00Z",
          "positionKm": [
            -54122.878,
            -315798.791,
            -158851.758
          ],
          "moonPositionKm": [
            -140020.25,
            -303474.984,
            -146620.017
          ]
        },
        {
          "timestamp": "2022-11-24T15:03:00Z",
          "positionKm": [
            -29481.288,
            -321801.663,
            -163717.828
          ],
          "moonPositionKm": [
            -118030.244,
            -309713.392,
            -151385.458
          ]
        },
        {
          "timestamp": "2022-11-24T21:03:00Z",
          "positionKm": [
            -5002.803,
            -326503.2,
            -167901.727
          ],
          "moonPositionKm": [
            -95588.672,
            -314757.915,
            -155566.399
          ]
        },
        {
          "timestamp": "2022-11-25T03:03:00Z",
          "positionKm": [
            19226.083,
            -329938.298,
            -171415.07
          ],
          "moonPositionKm": [
            -72781.529,
            -318583.66,
            -159143.952
          ]
        },
        {
          "timestamp": "2022-11-25T09:03:00Z",
          "positionKm": [
            43123.279,
            -332146.414,
            -174272.162
          ],
          "moonPositionKm": [
            -49697.148,
            -321171.268,
            -162101.922
          ]
        },
        {
          "timestamp": "2022-11-25T15:03:00Z",
          "positionKm": [
            66611.584,
            -333170.017,
            -176489.233
          ],
          "moonPositionKm": [
            -26425.669,
            -322507.09,
            -164426.934
          ]
        },
        {
          "timestamp": "2022-11-25T21:03:00Z",
          "positionKm": [
            89618.701,
            -333053.233,
            -178083.727
          ],
          "moonPositionKm": [
            -3058.481,
            -322583.305,
            -166108.541
          ]
        },
        {
          "timestamp": "2022-11-26T03:03:00Z",
          "positionKm": [
            111191.069,
            -333519.479,
            -179844.786
          ],
          "moonPositionKm": [
            20312.347,
            -321397.994,
            -167139.292
          ]
        },
        {
          "timestamp": "2022-11-26T09:03:00Z",
          "positionKm": [
            132007.824,
            -333214.285,
            -181148.616
          ],
          "moonPositionKm": [
            43594.641,
            -318955.151,
            -167514.784
          ]
        },
        {
          "timestamp": "2022-11-26T15:03:00Z",
          "positionKm": [
            152161.933,
            -331899.587,
            -181884.382
          ],
          "moonPositionKm": [
            66696.693,
            -315264.638,
            -167233.678
          ]
        },
        {
          "timestamp": "2022-11-26T21:03:00Z",
          "positionKm": [
            171602.312,
            -329611.183,
            -182066.966
          ],
          "moonPositionKm": [
            89527.822,
            -310342.089,
            -166297.69
          ]
        },
        {
          "timestamp": "2022-11-27T03:03:00Z",
          "positionKm": [
            190277.336,
            -326375.227,
            -181712.484
          ],
          "moonPositionKm": [
            111998.915,
            -304208.767,
            -164711.55
          ]
        },
        {
          "timestamp": "2022-11-27T09:03:00Z",
          "positionKm": [
            208148.881,
            -322220.041,
            -180821.328
          ],
          "moonPositionKm": [
            134022.938,
            -296891.366,
            -162482.942
          ]
        },
        {
          "timestamp": "2022-11-27T15:03:00Z",
          "positionKm": [
            225171.25,
            -317158.656,
            -179402.276
          ],
          "moonPositionKm": [
            155515.422,
            -288421.778,
            -159622.414
          ]
        },
        {
          "timestamp": "2022-11-27T21:03:00Z",
          "positionKm": [
            241306.895,
            -311198.581,
            -177456.574
          ],
          "moonPositionKm": [
            176394.909,
            -278836.823,
            -156143.273
          ]
        },
        {
          "timestamp": "2022-11-28T03:03:00Z",
          "positionKm": [
            256520.946,
            -304339.843,
            -174985.261
          ],
          "moonPositionKm": [
            196583.352,
            -268177.947,
            -152061.45
          ]
        },
        {
          "timestamp": "2022-11-28T09:03:00Z",
          "positionKm": [
            270795.3,
            -296579.105,
            -171975.431
          ],
          "moonPositionKm": [
            216006.481,
            -256490.894,
            -147395.366
          ]
        },
        {
          "timestamp": "2022-11-28T15:03:00Z",
          "positionKm": [
            284113.762,
            -287904.201,
            -168428.186
          ],
          "moonPositionKm": [
            234594.119,
            -243825.359,
            -142165.769
          ]
        },
        {
          "timestamp": "2022-11-28T21:03:00Z",
          "positionKm": [
            296473.019,
            -278304.622,
            -164339.643
          ],
          "moonPositionKm": [
            252280.45,
            -230234.634,
            -136395.57
          ]
        },
        {
          "timestamp": "2022-11-29T03:03:00Z",
          "positionKm": [
            307874.685,
            -267779.666,
            -159703.148
          ],
          "moonPositionKm": [
            269004.251,
            -215775.237,
            -130109.67
          ]
        },
        {
          "timestamp": "2022-11-29T09:03:00Z",
          "positionKm": [
            318328.53,
            -256329.881,
            -154521.229
          ],
          "moonPositionKm": [
            284709.072,
            -200506.54,
            -123334.779
          ]
        },
        {
          "timestamp": "2022-11-29T15:03:00Z",
          "positionKm": [
            327846.715,
            -243962.789,
            -148801.169
          ],
          "moonPositionKm": [
            299343.376,
            -184490.403,
            -116099.236
          ]
        },
        {
          "timestamp": "2022-11-29T21:03:00Z",
          "positionKm": [
            336438.182,
            -230695.961,
            -142551.398
          ],
          "moonPositionKm": [
            312860.649,
            -167790.809,
            -108432.831
          ]
        },
        {
          "timestamp": "2022-11-30T03:03:00Z",
          "positionKm": [
            344103.439,
            -216556.31,
            -135786.06
          ],
          "moonPositionKm": [
            325219.458,
            -150473.503,
            -100366.619
          ]
        },
        {
          "timestamp": "2022-11-30T09:03:00Z",
          "positionKm": [
            350838.729,
            -201572.701,
            -128520.001
          ],
          "moonPositionKm": [
            336383.492,
            -132605.653,
            -91932.75
          ]
        },
        {
          "timestamp": "2022-11-30T15:03:00Z",
          "positionKm": [
            356631.142,
            -185778.663,
            -120769.719
          ],
          "moonPositionKm": [
            346321.558,
            -114255.509,
            -83164.292
          ]
        },
        {
          "timestamp": "2022-11-30T21:03:00Z",
          "positionKm": [
            361460.729,
            -169209.691,
            -112550.058
          ],
          "moonPositionKm": [
            355007.563,
            -95492.088,
            -74095.067
          ]
        },
        {
          "timestamp": "2022-12-01T03:03:00Z",
          "positionKm": [
            365387.108,
            -151692.803,
            -103799.849
          ],
          "moonPositionKm": [
            362420.466,
            -76384.865,
            -64759.487
          ]
        },
        {
          "timestamp": "2022-12-01T09:03:00Z",
          "positionKm": [
            368300.952,
            -133441.171,
            -94603.26
          ],
          "moonPositionKm": [
            368544.208,
            -57003.491,
            -55192.403
          ]
        },
        {
          "timestamp": "2022-12-01T15:03:00Z",
          "positionKm": [
            370142.787,
            -114536.248,
            -84996.423
          ],
          "moonPositionKm": [
            373367.625,
            -37417.51,
            -45428.958
          ]
        },
        {
          "timestamp": "2022-12-01T21:03:00Z",
          "positionKm": [
            370872.48,
            -95012.293,
            -74990.173
          ],
          "moonPositionKm": [
            376884.349,
            -17696.111,
            -35504.442
          ]
        },
        {
          "timestamp": "2022-12-02T03:03:00Z",
          "positionKm": [
            372988.699,
            -75039.228,
            -64587.705
          ],
          "moonPositionKm": [
            379092.692,
            2092.121,
            -25454.163
          ]
        },
        {
          "timestamp": "2022-12-02T09:03:00Z",
          "positionKm": [
            374337.127,
            -54570.002,
            -53832.072
          ],
          "moonPositionKm": [
            379995.518,
            21879.428,
            -15313.321
          ]
        },
        {
          "timestamp": "2022-12-02T15:03:00Z",
          "positionKm": [
            374436.672,
            -33633.407,
            -42754.173
          ],
          "moonPositionKm": [
            379600.106,
            41599.093,
            -5116.885
          ]
        },
        {
          "timestamp": "2022-12-02T21:03:00Z",
          "positionKm": [
            373249.615,
            -12296.132,
            -31383.776
          ],
          "moonPositionKm": [
            377918.008,
            61185.637,
            5100.515
          ]
        },
        {
          "timestamp": "2022-12-03T03:03:00Z",
          "positionKm": [
            370743.054,
            9388.293,
            -19753.516
          ],
          "moonPositionKm": [
            374964.898,
            80575.004,
            15304.697
          ]
        },
        {
          "timestamp": "2022-12-03T09:03:00Z",
          "positionKm": [
            366891.342,
            31368.978,
            -7881.708
          ],
          "moonPositionKm": [
            370760.409,
            99704.733,
            25462.027
          ]
        },
        {
          "timestamp": "2022-12-03T15:03:00Z",
          "positionKm": [
            361675.088,
            53594.511,
            4186.401
          ],
          "moonPositionKm": [
            365327.976,
            118514.119,
            35539.513
          ]
        },
        {
          "timestamp": "2022-12-03T21:03:00Z",
          "positionKm": [
            355088.348,
            76010.478,
            16436.354
          ],
          "moonPositionKm": [
            358694.669,
            136944.358,
            45504.892
          ]
        },
        {
          "timestamp": "2022-12-04T03:03:00Z",
          "positionKm": [
            347137.313,
            98587.463,
            28840.447
          ],
          "moonPositionKm": [
            350891.017,
            154938.689,
            55326.713
          ]
        },
        {
          "timestamp": "2022-12-04T09:03:00Z",
          "positionKm": [
            337846.155,
            121314.694,
            41384.123
          ],
          "moonPositionKm": [
            341950.838,
            172442.515,
            64974.418
          ]
        },
        {
          "timestamp": "2022-12-04T15:03:00Z",
          "positionKm": [
            327261.107,
            144232.25,
            54057.298
          ],
          "moonPositionKm": [
            331911.061,
            189403.521,
            74418.408
          ]
        },
        {
          "timestamp": "2022-12-04T21:03:00Z",
          "positionKm": [
            315466.47,
            167416.087,
            66922.41
          ],
          "moonPositionKm": [
            320811.547,
            205771.781,
            83630.117
          ]
        },
        {
          "timestamp": "2022-12-05T03:03:00Z",
          "positionKm": [
            302610.83,
            191152.151,
            80036.815
          ],
          "moonPositionKm": [
            308694.904,
            221499.85,
            92582.07
          ]
        },
        {
          "timestamp": "2022-12-05T09:03:00Z",
          "positionKm": [
            289022.802,
            216133.869,
            93662.903
          ],
          "moonPositionKm": [
            295606.307,
            236542.855,
            101247.94
          ]
        },
        {
          "timestamp": "2022-12-05T15:03:00Z",
          "positionKm": [
            276367.285,
            245226.259,
            108627.565
          ],
          "moonPositionKm": [
            281593.311,
            250858.566,
            109602.604
          ]
        },
        {
          "timestamp": "2022-12-05T21:03:00Z",
          "positionKm": [
            285451.059,
            257526.722,
            108191.5
          ],
          "moonPositionKm": [
            266705.666,
            264407.466,
            117622.188
          ]
        },
        {
          "timestamp": "2022-12-06T03:03:00Z",
          "positionKm": [
            289354.024,
            258443.62,
            103793.734
          ],
          "moonPositionKm": [
            250995.127,
            277152.806,
            125284.108
          ]
        },
        {
          "timestamp": "2022-12-06T09:03:00Z",
          "positionKm": [
            291462.867,
            259059.47,
            99638.343
          ],
          "moonPositionKm": [
            234515.271,
            289060.654,
            132567.113
          ]
        },
        {
          "timestamp": "2022-12-06T15:03:00Z",
          "positionKm": [
            292363.239,
            259138.176,
            95399.555
          ],
          "moonPositionKm": [
            217321.308,
            300099.932,
            139451.313
          ]
        },
        {
          "timestamp": "2022-12-06T21:03:00Z",
          "positionKm": [
            292225.514,
            258576.465,
            91014.423
          ],
          "moonPositionKm": [
            199469.895,
            310242.449,
            145918.207
          ]
        },
        {
          "timestamp": "2022-12-07T03:03:00Z",
          "positionKm": [
            291103.951,
            257345.799,
            86434.928
          ],
          "moonPositionKm": [
            181018.956,
            319462.911,
            151950.709
          ]
        },
        {
          "timestamp": "2022-12-07T09:03:00Z",
          "positionKm": [
            289025.495,
            255409.856,
            81650.443
          ],
          "moonPositionKm": [
            162027.494,
            327738.945,
            157533.167
          ]
        },
        {
          "timestamp": "2022-12-07T15:03:00Z",
          "positionKm": [
            285998.585,
            252734.29,
            76659.192
          ],
          "moonPositionKm": [
            142555.415,
            335051.088,
            162651.372
          ]
        },
        {
          "timestamp": "2022-12-07T21:03:00Z",
          "positionKm": [
            282010.776,
            249294.547,
            71462.388
          ],
          "moonPositionKm": [
            122663.355,
            341382.793,
            167292.57
          ]
        },
        {
          "timestamp": "2022-12-08T03:03:00Z",
          "positionKm": [
            277044.36,
            245051.306,
            66051.337
          ],
          "moonPositionKm": [
            102412.503,
            346720.403,
            171445.467
          ]
        },
        {
          "timestamp": "2022-12-08T09:03:00Z",
          "positionKm": [
            271078.94,
            239945.893,
            60436.18
          ],
          "moonPositionKm": [
            81864.436,
            351053.139,
            175100.23
          ]
        },
        {
          "timestamp": "2022-12-08T15:03:00Z",
          "positionKm": [
            264051.495,
            233968.578,
            54603.598
          ],
          "moonPositionKm": [
            61080.959,
            354373.064,
            178248.478
          ]
        },
        {
          "timestamp": "2022-12-08T21:03:00Z",
          "positionKm": [
            255912.953,
            227050.49,
            48559.076
          ],
          "moonPositionKm": [
            40123.946,
            356675.05,
            180883.284
          ]
        },
        {
          "timestamp": "2022-12-09T03:03:00Z",
          "positionKm": [
            246597.381,
            219114.822,
            42310.802
          ],
          "moonPositionKm": [
            19055.191,
            357956.736,
            182999.152
          ]
        },
        {
          "timestamp": "2022-12-09T09:03:00Z",
          "positionKm": [
            236012.486,
            210077.898,
            35860.36
          ],
          "moonPositionKm": [
            -2063.733,
            358218.48,
            184592.013
          ]
        },
        {
          "timestamp": "2022-12-09T15:03:00Z",
          "positionKm": [
            224041.644,
            199830.672,
            29210.868
          ],
          "moonPositionKm": [
            -23171.617,
            357463.309,
            185659.203
          ]
        },
        {
          "timestamp": "2022-12-09T21:03:00Z",
          "positionKm": [
            210532.493,
            188231.393,
            22371.995
          ],
          "moonPositionKm": [
            -44207.737,
            355696.863,
            186199.442
          ]
        },
        {
          "timestamp": "2022-12-10T03:03:00Z",
          "positionKm": [
            195277.85,
            175089.418,
            15358.82
          ],
          "moonPositionKm": [
            -65111.985,
            352927.331,
            186212.815
          ]
        },
        {
          "timestamp": "2022-12-10T09:03:00Z",
          "positionKm": [
            178000.467,
            160146.561,
            8197.46
          ],
          "moonPositionKm": [
            -85824.977,
            349165.398,
            185700.748
          ]
        },
        {
          "timestamp": "2022-12-10T15:03:00Z",
          "positionKm": [
            158287.545,
            143024.544,
            932.445
          ],
          "moonPositionKm": [
            -106288.166,
            344424.175,
            184665.98
          ]
        },
        {
          "timestamp": "2022-12-10T21:03:00Z",
          "positionKm": [
            135500.756,
            123134.859,
            -6335.821
          ],
          "moonPositionKm": [
            -126443.942,
            338719.137,
            183112.539
          ]
        },
        {
          "timestamp": "2022-12-11T03:03:00Z",
          "positionKm": [
            108538.657,
            99464.734,
            -13393.349
          ],
          "moonPositionKm": [
            -146235.724,
            332068.057,
            181045.714
          ]
        },
        {
          "timestamp": "2022-12-11T09:03:00Z",
          "positionKm": [
            75041.617,
            69801.95,
            -19550.976
          ],
          "moonPositionKm": [
            -165608.049,
            324490.944,
            178472.029
          ]
        },
        {
          "timestamp": "2022-12-11T15:03:00Z",
          "positionKm": [
            27157.801,
            26660.378,
            -20945.544
          ],
          "moonPositionKm": [
            -184506.658,
            316009.979,
            175399.215
          ]
        }
      ]
    },
    "events": {
      "missionId": "artemis-i",
      "events": [
        {
          "id": "launch",
          "timestamp": "2022-11-16T06:47:44Z",
          "title": "Launch",
          "type": "mission",
          "description": "SLS launches Artemis I from LC-39B."
        },
        {
          "id": "closest-approach",
          "timestamp": "2022-11-21T12:44:00Z",
          "title": "Closest lunar approach",
          "type": "milestone",
          "description": "Orion passes about 130 km above the Moon."
        },
        {
          "id": "dro-entry",
          "timestamp": "2022-11-25T20:00:00Z",
          "title": "Distant retrograde orbit entry",
          "type": "mission",
          "description": "Orion settles into distant retrograde orbit."
        },
        {
          "id": "return-flyby",
          "timestamp": "2022-12-05T16:43:00Z",
          "title": "Return lunar flyby",
          "type": "milestone",
          "description": "Final lunar flyby bends Orion onto Earth return."
        },
        {
          "id": "splashdown",
          "timestamp": "2022-12-11T17:20:00Z",
          "title": "Splashdown",
          "type": "mission",
          "description": "Artemis I returns to the Pacific."
        }
      ]
    },
    "latest_state": {
      "missionId": "artemis-i",
      "asOf": "2022-11-21T12:44:00Z",
      "sampleIndex": 21,
      "mode": "latest",
      "summary": "Archive pointer is set to Artemis I closest lunar approach to foreground the flown ephemeris.",
      "source": {
        "kind": "generated",
        "generatedAt": "2026-04-05T11:41:22.780Z",
        "description": "Historical missions use a curated archive pointer instead of wall-clock live telemetry."
      }
    },
    "media": {
      "missionId": "artemis-i",
      "items": [
        {
          "id": "orion-selfie",
          "eventId": "closest-approach",
          "title": "Orion outbound selfie",
          "caption": "Public Artemis I imagery during lunar transit.",
          "url": "https://images-assets.nasa.gov/image/KSC-20221121-PH-KLS01_0011/KSC-20221121-PH-KLS01_0011~orig.jpg"
        }
      ]
    }
  }
};
