const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	thumbnail: {
		type: String,
	},
	previewVideo: {
		type: String,
	},
	author: {
		type: String,
	},
	description: {
		type: String,
	},
	price: {
		type: String,
	},
	discount: {
		type: String,
	},
	status: {
		type: String,
		default: "pending",
	}, //approved or rejected or pending
	category: {
		type: String,
	},
	subCategory: {
		type: String,
	},
	learners: [],
	wishlist: [],
	review: [
		{
			user: {
				type: Object,
			},
			rating: {
				type: String,
			},
			text: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	outline: [
		{
			lectureNo: {
				type: String,
			},
			lectureTitle: {
				type: String,
			},
			complected: {
				type: Boolean,
			},
			lesson: [
				{
					lessonNo: {
						type: Number,
					},
					lectureNo: {
						type: String,
					},
					lessonTitle: {
						type: String,
					},
					lessonDesc: {
						type: String,
					},
					status: {
						type: Boolean,
					},
					teachersNote: [
						{
							referenceTitle: {
								type: String,
							},
							referenceLinks: {
								type: String,
							},
						},
					],
					download: {
						attachment: {
							type: String,
						},
						attachmentLink: {
							type: String,
						},
					},
					duration: {
						type: String,
					},
					video: {
						type: String,
					},
					momentum: {
						happy: [],
						sad: [],
						anger: [],
					},
					date: {
						type: Date,
						default: Date.now,
					},
				},
            ],
            quiz: [
                {
                    question: {
                        type: String,
                    },
                    options: [
                        {
                            type: String,
                        },
                    ],
                    answers: [
                        {
                            type: String,
                        }
                    ],
                    date: {
                        type: Date,
                        default: Date.now,
                    },
                }
            ],
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("courses", CourseSchema);
