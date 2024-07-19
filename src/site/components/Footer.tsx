"use client";

import clsx from "clsx";
import { useState } from "react";

import Action from "@/lib/components/Action";
import { FormData } from "@/lib/components/Form";
import Image from "@/lib/components/Image";
import Modal from "@/lib/components/Modal";
import SocialIcon from "@/lib/components/SocialIcon";
import { Config } from "@/lib/sanity/types";

import styles from "./Footer.module.css";

export interface FooterProps {
    siteConfig: Config;
    className?: string;
    inverted?: boolean;
}

export default function Footer({
    siteConfig,
    className = "",
    inverted = false,
}: FooterProps) {
    const [submitting, setSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    function onSubmit(values: FormData) {
        setSubmitting(true);

        fetch("/api/newsletter", {
            method: "POST",
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                setTimeout(() => {
                    setSubmitting(false);
                    setModalOpen(true);
                }, 250);
            });
    }

    return (
        <>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                <div className="w-full max-w-[500px] bg-white p-4">
                    <p className="font-counter mb-8 text-5xl leading-[0.9em] tracking-tighter">
                        Thanks for subscribing!
                    </p>

                    <Action
                        onClick={() => setModalOpen(false)}
                        className="float-right bg-black px-4 py-1 text-white"
                    >
                        Close
                    </Action>
                </div>
            </Modal>

            <div
                className={clsx(className, "w-full", {
                    "bg-black text-white": !inverted,
                    "bg-white text-black": inverted,
                })}
            >
                <div className="mx-auto max-w-screen-xl px-4 py-4 md:py-12">
                    <div className="my-4">
                        <ul className="flex items-center justify-center text-3xl">
                            <li
                                className={clsx(
                                    "mr-4 flex-grow border-t sm:mr-8",
                                    {
                                        "border-white": !inverted,
                                        "border-black": inverted,
                                    },
                                )}
                            />
                            {siteConfig.socialLinks.map((social, idx) => (
                                <li key={idx}>
                                    <Action
                                        label={social.platform}
                                        href={social.link}
                                        target="_blank"
                                    >
                                        <SocialIcon
                                            platform={social.platform}
                                            className="m-[0.3em] h-[1em] w-[1em] md:m-[0.8em]"
                                        />
                                    </Action>
                                </li>
                            ))}
                            <li
                                className={clsx(
                                    "ml-4 flex-grow border-t sm:ml-8",
                                    {
                                        "border-white": !inverted,
                                        "border-black": inverted,
                                    },
                                )}
                            />
                        </ul>
                    </div>

                    {/* <div
                        className={clsx(
                            styles.Footer,
                            "mx-auto max-w-[400px] md:max-w-full",
                        )}
                    >
                        <div
                            className={clsx(
                                styles.Quick,
                                "shrink grow basis-[240px]",
                            )}
                        >
                            <p className="my-3 text-sm font-bold sm:text-base">
                                Quick Links
                            </p>
                        </div>

                        <div
                            className={clsx(
                                styles.Services,
                                "shrink grow basis-[240px]",
                            )}
                        >
                            <p className="my-3 text-sm font-bold sm:text-base">
                                Our Services
                            </p>
                        </div>

                        <div
                            className={clsx(
                                styles.Recent,
                                "shrink grow basis-[240px]",
                            )}
                        >
                            <p className="my-3 text-sm font-bold sm:text-base">
                                Recent Work
                            </p>
                        </div>

                        <div
                            className={clsx(
                                styles.Newsletter,
                                "shrink grow basis-[240px]",
                            )}
                        >
                            <p className="my-3 font-bold">Newsletter</p>
                            <p className="my-2 text-sm">
                                Want more updates from the team? Subscribe to
                                our monthly newsletter!
                            </p>

                            <Form
                                onSubmit={onSubmit}
                                className="flex items-center justify-center gap-1"
                            >
                                <Form.Input
                                    className="grow rounded-none border-2 border-black bg-white p-1 text-sm text-black"
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                />

                                <button
                                    type="submit"
                                    className={clsx(
                                        "relative float-right rounded-none border-2 border-black px-2 py-1 text-sm",
                                        {
                                            "bg-white text-black": !inverted,
                                            "bg-black text-white": inverted,
                                        },
                                    )}
                                >
                                    <span
                                        className={clsx({
                                            "opacity-100": !submitting,
                                            "opacity-0": submitting,
                                        })}
                                    >
                                        Submit
                                    </span>
                                    <div
                                        className={clsx(
                                            "absolute left-0 top-[5px] h-full w-full",
                                            {
                                                "opacity-0": !submitting,
                                                "opacity-100": submitting,
                                            },
                                        )}
                                    >
                                        <Spinner
                                            className={clsx("h-[1em]", {
                                                "border-black": !inverted,
                                                "border-white": inverted,
                                            })}
                                        />
                                    </div>
                                </button>
                            </Form>
                        </div>
                    </div> */}

                    <div>
                        <div className="m-auto w-[150px] py-4">
                            <Image
                                src={siteConfig.siteLogo}
                                className={clsx({
                                    invert: !inverted,
                                })}
                            />
                        </div>

                        <p className="text-center text-sm">
                            Site for demonstation purposes only.
                        </p>

                        {/* <p className="text-center text-sm">
                            &copy; {new Date().getFullYear()}{" "}
                            {siteConfig.companyName}. All rights reserved.
                        </p> */}
                    </div>
                </div>
            </div>
        </>
    );
}
