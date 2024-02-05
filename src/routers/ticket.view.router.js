import { Router } from "express";
import passport from "passport";
import { TicketService } from "../services/repositories/index.js"

const router = Router();

router.get("/:ticketId", passport.authenticate('current', { session: false }), async (req, res) => {
	const ticketId = req.params.ticketId;
	const ticket = await TicketService.getById(ticketId);

	if (!ticket) {
		return res.render("error", { error: "Ticket not found" });
	}

	res.render("ticket", { ticket });
});

export default router;