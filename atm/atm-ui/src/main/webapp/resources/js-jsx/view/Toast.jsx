function Toast(props) {
    return (
        <div class="toast" data-autohide="false">
            <div class="toast-header">
                <strong class="mr-auto text-primary">{props.header}</strong>
                <small class="text-muted">{props.time}</small>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>
            </div>
            <div class="toast-body">
                {props.body}
            </div>
        </div>
    )
}