import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { dimensions } from "./Dashboard/dashboardHelper";
import { connect } from "react-redux";
import { fetchRepository } from "../redux/repository/actions";

const Container = styled.section`
    /* max-width: 1200px;
    margin: auto;
    padding: 20px 50px;
    box-sizing: border-box; */
`;
const Content = styled.section`
    margin: auto;
    padding: 50px 20px 50px 20px;
    box-sizing: border-box;
    background-color: #f3f3f3;

    .content-container {
        display: flex;
        max-width: 1200px;
        margin: auto;
        gap: 30px;

        @media (max-width: ${dimensions.md}) {
            flex-wrap: wrap;
        }

        .files-container {
            width: 65%;

            @media (max-width: ${dimensions.md}) {
                width: 100%;
            }

            .files {
                background-color: white;
                border-radius: 12px;
                border: 1px solid #777777;

                .file {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 15px;
                    box-sizing: border-box;
                    border-bottom: 1px solid #777777;

                    h4,
                    p {
                        margin: 0px;
                    }

                    h4 {
                        font-size: 16px;
                    }

                    p {
                        font-size: 12px;
                        opacity: 50%;
                    }

                    button {
                        padding: 6px 12px;
                        gap: 10px;
                        border-radius: 6px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        font-size: 14px;
                        background-color: rgb(104, 124, 120);
                        color: white;
                        box-shadow: 0px;
                        border: 0px;

                        img {
                            width: 15px;
                        }
                    }

                    &:last-child {
                        border: 0px;
                    }
                }
            }
        }

        .info-container {
            width: 35%;
            display: flex;
            flex-direction: column;
            gap: 20px;

            @media (max-width: ${dimensions.md}) {
                width: 100%;
            }

            .info {
                background-color: white;
                border-radius: 12px;
                padding: 20px;
                box-sizing: border-box;

                h4 {
                    font-size: 16px;
                }

                p {
                    opacity: 50%;
                }

                .statement {
                    background-color: #f3f3f3;
                    border: 1px solid #f3f3f3;
                    padding: 15px;
                    box-sizing: border-box;
                    border-radius: 12px;
                    margin: 15px 0px;
                }

                button {
                    padding: 5px 10px;
                    gap: 10px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    font-size: 14px;
                    background-color: white;
                    color: #777;
                    box-shadow: 0px;
                    border: 1px solid #777;
                    float: right;

                    img {
                        width: 13px;
                    }
                }
            }
        }
    }
`;

const Navbar = styled.section`
    max-width: 1200px;
    margin: auto;
    flex-wrap: wrap;
    padding: 20px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(147, 172, 167);
    margin-bottom: 50px;

    .breadcrumbs {
        display: flex;
        gap: 10px;

        a,
        span {
            color: rgb(147, 172, 167);
            font-size: clamp(12px, 2vw, 16px);
        }

        .doi {
            color: black;
        }
    }

    .logo {
        height: 50px;
        margin-bottom: 15px;
    }
`;

const Header = styled.section`
    max-width: 1200px;
    margin: auto;
    padding: 20px 50px 80px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
    align-items: start;

    .tag {
        background-color: rgba(147, 172, 167, 0.2);
        padding: 6px 12px;
        border-radius: 6px;
        color: rgb(104, 124, 120);
        font-size: 12px;
    }

    h2 {
        /* margin: 30px 0px; */
        font-size: clamp(28px, 3vw, 40px);
        line-height: 120%;
    }

    p {
        opacity: 50%;
        font-size: clamp(14px, 2vw, 16px);
    }

    .details {
        font-size: clamp(14px, 2vw, 16px);
    }

    .doi-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 15px;

        .doi-tag {
            opacity: 50%;
            font-size: 16px;
        }
        .doi {
            opacity: 100%;
            font-size: 16px;
        }

        button {
            background-color: white;
            display: flex;
            gap: 10px;
            color: rgb(104, 124, 120);
            border-radius: 6px;
            padding: 4px 12px;
            border: 1px solid rgb(104, 124, 120);
            cursor: pointer;
            font-size: clamp(14px, 2vw, 16px);

            img {
                width: 15px;
            }
        }
    }

    .download-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 15px;
        margin-top: 30px;

        button {
            padding: 8px 16px;
            gap: 10px;
            border-radius: 6px;
            display: flex;
            cursor: pointer;
            font-size: 16px;

            img {
                width: 15px;
            }
        }

        .download {
            background-color: rgb(39, 123, 65);
            color: white;
            border-color: rgb(39, 123, 65);
        }

        .cite {
            background-color: white;
            color: rgb(39, 123, 65);
            border-color: rgb(39, 123, 65);
        }
    }
`;

function Repository(props) {
    const { current } = props;
    const params = useParams();
    const doi = params["*"];
    const [copied, setCopied] = useState([false, false, false]);
    console.log(current);

    const downloadFile = (path) => {
        const link = document.createElement("a");
        link.href = path;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        if (doi) {
            props.fetchRepository(doi);
        }
    }, [doi]);

    const copyText = async (text, index) => {
        await navigator.clipboard.writeText(text);
        var tempCopied = [...copied];
        tempCopied[index] = true;
        setCopied(tempCopied);

        setTimeout(() => {
            setCopied([false, false, false]);
        }, 2000);
    };

    return (
        <Container>
            <Navbar>
                <img className="logo" src="/logo_mobile.svg" alt="DeNIS" />
                <div className="breadcrumbs">
                    <Link to="/">denis-db.com</Link>
                    <span>/</span>
                    <span>repositories</span>
                    <span>/</span>
                    <span className="doi">{doi}</span>
                </div>
            </Navbar>
            <Header>
                <span className="tag">Dataset</span>

                <h2>{current.title}</h2>
                <p>{current.authors}</p>

                <div className="doi-container">
                    <div className="tag">
                        <span className="doi-tag">DOI</span>{" "}
                        <span className="doi">{doi}</span>
                    </div>
                    <button onClick={() => copyText(doi, 2)}>
                        <img src="/images/icons/copy.svg" alt="copy" />
                        <div>{copied[2] ? "Copied!" : "Copy DOI"}</div>
                    </button>
                </div>

                <div className="details">
                    Published <b>{current.submission}</b> License{" "}
                    <b>{current.license}</b> Total size <b>{current.size}</b>
                </div>

                <div className="download-container">
                    <button
                        onClick={() => downloadFile(current.zip)}
                        className="download"
                    >
                        <img
                            src="/images/icons/download_white.svg"
                            alt="download"
                        />
                        <div>Download all files (.zip)</div>
                    </button>

                    <button
                        onClick={() => copyText(current.citation, 1)}
                        className="cite"
                    >
                        <img src="/images/icons/copy.svg" alt="copy" />
                        <div>{copied[1] ? "Copied!" : "Cite this dataset"}</div>
                    </button>
                </div>
            </Header>
            <Content>
                <div className="content-container">
                    <div className="files-container">
                        <h3>Files</h3>
                        <div className="files">
                            {current?.data &&
                                current.data.length &&
                                current?.data.map((file) => (
                                    <div className="file">
                                        <div>
                                            <h4>{file.title}</h4>
                                            <p>
                                                {file.rows} rows ·{" "}
                                                {file.columns} columns ·{" "}
                                                {file.size}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                downloadFile(file.url)
                                            }
                                        >
                                            <img
                                                src="/images/icons/download_white.svg"
                                                alt="download"
                                            />
                                            <div>Download</div>
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="info-container">
                        <div className="info">
                            <h4>For your manuscript</h4>
                            <p>
                                Paste this into your data availability
                                statement.
                            </p>
                            <div className="statement">
                                Data supporting this study are openly available
                                in the DeNIS repository at
                                <a
                                    style={{ marginLeft: "5px" }}
                                    href={
                                        "https://denis-db.com/repositories/" +
                                        doi
                                    }
                                    target="__blank"
                                >
                                    https://denis-db.com/repositories/{doi}.
                                </a>
                            </div>
                            <button
                                onClick={() =>
                                    copyText(
                                        "Data supporting this study are openly available in the DeNIS repository at https://denis-db.com/repositories/" +
                                            doi,
                                        0,
                                    )
                                }
                            >
                                <img src="/images/icons/copy.svg" alt="copy" />
                                <div>
                                    {copied[0] ? "Copied!" : "Copy sentence"}
                                </div>
                            </button>
                        </div>

                        <div className="info">
                            <h4>For your manuscript</h4>
                            <p>
                                Paste this into your data availability
                                statement.
                            </p>
                            <div className="statement">{current.citation}</div>
                            <button
                                onClick={() => copyText(current.citation, 1)}
                            >
                                <img src="/images/icons/copy.svg" alt="copy" />
                                <div>
                                    {copied[1] ? "Copied!" : "Copy citation"}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </Content>

            <center>teste</center>
        </Container>
    );
}
const mapStateToProps = (state) => {
    return {
        current: state.repository.current,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRepository: (doi) => dispatch(fetchRepository(doi)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
