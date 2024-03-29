import {Document, model, ObjectId, Schema} from "mongoose";

export interface StatsInt extends Document {
    userId: ObjectId;
    mmr: number;
    mmrHistory: number[];
    gamesPlayed: number;
    ratingChange: number;
    wins: number;
    losses: number;
    draws: number;
    gameHistory: string[];
    winRate: number;
}

export const StatsSchema = new Schema({
    userId: Schema.Types.ObjectId,
    mmr: Number,
    mmrHistory: [Number],
    gamesPlayed: Number,
    ratingChange: Number,
    wins: Number,
    losses: Number,
    draws: Number,
    gameHistory: [String],
    winRate: Number,
});

export default model<StatsInt>('stats', StatsSchema);
