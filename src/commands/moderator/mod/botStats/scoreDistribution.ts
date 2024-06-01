import {SlashCommandSubcommandBuilder} from "discord.js";
import {SubCommand} from "../../../../interfaces/Command";
import cacheController from "../../../../controllers/CacheController";
import {getScoreDistGraph} from "../../../../utility/graph.util";
import {logError} from "../../../../utility/loggers";
import discordTokens from "../../../../config/discordTokens";

export const scoreDist: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName('score_distribution')
        .setDescription("Displays a graph with the score distribution"),
    run: async (interaction) => {
        try {
            await interaction.deferReply()
            const games = await cacheController.getCompletedGames();
            const scoreMap = new Map<number, number>();
            for (let number of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
                scoreMap.set(number, 0);
            }
            let total = 0;
            for (let game of games) {
                total++;
                if (game.scoreA == 10) {
                    scoreMap.set(game.scoreB, scoreMap.get(game.scoreB)! + 1);
                } else if (game.scoreB == 10) {
                    scoreMap.set(game.scoreA, scoreMap.get(game.scoreA)! + 1);
                }
            }

            const labels: string[] = [];
            const percents: number[] = [];

            for (let value of scoreMap) {
                labels.push(`10-${value[0]}`);
                percents.push((value[1] / total) * 100);
            }


            await interaction.followUp({ephemeral: false, files: [await getScoreDistGraph(labels, percents)]});
        } catch (e) {
            await logError(e, interaction);
        }
    },
    name: 'score_distribution',
    allowedRoles: discordTokens.Moderators,
}