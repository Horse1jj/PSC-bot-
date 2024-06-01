import {Button} from "../../../interfaces/Button";
import {ButtonBuilder} from "@discordjs/builders";
import {ButtonStyle} from "discord.js";
import {scoreLimiter} from "../../../utility/limiters";
import {logError} from "../../../utility/loggers";
import {matchScore} from "../../../utility/match.util";

export const win: Button = {
    data: new ButtonBuilder()
        .setLabel('Win')
        .setCustomId('match-win')
        .setStyle(ButtonStyle.Success),
    run: async (interaction, data) => {
        try {
            await matchScore(interaction, data, 10);
        } catch (e) {
            await logError(e, interaction);
        }
    },
    id: 'match-win',
    limiter: scoreLimiter,
}