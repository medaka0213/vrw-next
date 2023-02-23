import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

import { ImagePreview, SubmitButton, downloadFileFromUrl } from "react-vrw";

import MainBox from "./common/MainBox";

const Images = () => {
  return (
    <>
      <Grid container>
        <Grid xs={12}>
          <MainBox
            sx={{
              p: 2,
              mr: 2,
            }}
          >
            <Typography variant="h5" color="text.secondary" align="center">
              データ配布
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              「ロケット打ち上げを観る集会」のロゴやポスター等をダウンロードできます。公序良俗の範囲内でご自由にお使いください。
            </Typography>
          </MainBox>
        </Grid>
        <Grid xs={12} md={6}>
          <MainBox
            sx={{
              p: 2,
              mr: 2,
            }}
          >
            <ImagePreview
              src="https://img.virtualrocketwatching.net/image/image_22f0b303-0b4c-45c5-8ea0-71085d071755.png"
              alt="Image"
            />
            <Typography variant="h6" color="text.secondary">
              VRWLogo_JP
            </Typography>
            <Typography variant="body2" color="text.secondary">
              日本語版ロゴ
            </Typography>
            <Grid container>
              <Grid xs={6}>
                <SubmitButton
                  variant="outlined"
                  onClick={async () =>
                    await downloadFileFromUrl({
                      fileurl:
                        "https://img.virtualrocketwatching.net/image/image_22f0b303-0b4c-45c5-8ea0-71085d071755.png",
                      filename: "VRWLogo_JP.png",
                    })
                  }
                >
                  <SaveAltIcon
                    sx={{
                      mr: 1,
                    }}
                  />
                  PNG
                </SubmitButton>
              </Grid>
              <Grid xs={6}>
                <SubmitButton
                  variant="outlined"
                  onClick={async () =>
                    await downloadFileFromUrl({
                      fileurl:
                        "https://img.virtualrocketwatching.net/image/image_4f7d6ac8-9c74-4ef5-a917-44129992ca44.svg",
                      filename: "VRWLogo_JP.svg",
                    })
                  }
                >
                  <SaveAltIcon
                    sx={{
                      mr: 1,
                    }}
                  />
                  SVG
                </SubmitButton>
              </Grid>
            </Grid>
          </MainBox>
          <MainBox
            sx={{
              p: 2,
              mr: 2,
            }}
          >
            <ImagePreview
              src="https://img.virtualrocketwatching.net/image/image_d0aa0fa1-dd18-4ed4-a59a-47de2f5932a0.png"
              alt="Image"
            />
            <Typography variant="h6" color="text.secondary">
              VRWLogo_EN
            </Typography>
            <Typography variant="body2" color="text.secondary">
              英語版ロゴ
            </Typography>
            <Grid container>
              <Grid xs={6}>
                <SubmitButton
                  variant="outlined"
                  onClick={async () =>
                    await downloadFileFromUrl({
                      fileurl:
                        "https://img.virtualrocketwatching.net/image/image_d0aa0fa1-dd18-4ed4-a59a-47de2f5932a0.png",
                      filename: "VRWLogo_EN.png",
                    })
                  }
                >
                  <SaveAltIcon
                    sx={{
                      mr: 1,
                    }}
                  />
                  PNG
                </SubmitButton>
              </Grid>
              <Grid xs={6}>
                <SubmitButton
                  variant="outlined"
                  onClick={async () =>
                    await downloadFileFromUrl({
                      fileurl:
                        "https://img.virtualrocketwatching.net/image/image_21912965-e900-4ae4-a902-910d6b188b59.svg",
                      filename: "VRWLogo_EN.svg",
                    })
                  }
                >
                  <SaveAltIcon
                    sx={{
                      mr: 1,
                    }}
                  />
                  SVG
                </SubmitButton>
              </Grid>
            </Grid>
          </MainBox>
        </Grid>
        <Grid xs={12} md={6}>
          <MainBox
            sx={{
              p: 2,
              mr: 2,
            }}
          >
            <ImagePreview
              src="https://img.virtualrocketwatching.net/image/image_b4f73e9b-35f6-436c-b440-42765bf18505.jpeg"
              alt="Image"
            />
            <Typography variant="h6" color="text.secondary">
              VRWPoster_JP
            </Typography>
            <Typography variant="body2" color="text.secondary">
              日本語版ポスター
            </Typography>
            <Typography variant="body2" color="text.secondary">
              注意！CC2の画像を使用しているため、有償譲渡・商用利用はできません。また、ポスターの縦横比等を改変させての使用はお控えください
            </Typography>
            <Grid container>
              <Grid xs={6}>
                <SubmitButton
                  variant="outlined"
                  onClick={async () =>
                    await downloadFileFromUrl({
                      fileurl:
                        "https://img.virtualrocketwatching.net/image/image_b4f73e9b-35f6-436c-b440-42765bf18505.jpeg",
                      filename: "VRWPoster_JP.png",
                    })
                  }
                >
                  <SaveAltIcon
                    sx={{
                      mr: 1,
                    }}
                  />
                  JPEG, 1449:2048
                </SubmitButton>
              </Grid>
              <Grid xs={6}>
                <SubmitButton
                  variant="outlined"
                  onClick={async () =>
                    await downloadFileFromUrl({
                      fileurl:
                        "https://img.virtualrocketwatching.net/image/image_4fbc4fe2-ec3a-42ed-9828-6c20df468409.jpeg",
                      filename: "VRWPoster_JP_1080x1080.png",
                    })
                  }
                >
                  <SaveAltIcon
                    sx={{
                      mr: 1,
                    }}
                  />
                  JPEG, 1:1
                </SubmitButton>
              </Grid>
            </Grid>
          </MainBox>
        </Grid>
      </Grid>
    </>
  );
};

export default Images;
